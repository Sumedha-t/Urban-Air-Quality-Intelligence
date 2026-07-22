import axios from 'axios';
import * as mockDb from './mockData';

// API configurations
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
const USE_MOCK = false;

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper for simulating async API lag
const delay = (ms = 350) => new Promise(resolve => setTimeout(resolve, ms));

const OPENWEATHER_AQI_MAP = { 1: 40, 2: 75, 3: 125, 4: 175, 5: 250 };

const resolveAqiValue = (record) => {
  const pm25 = record?.pollutants?.pm2_5;
  if (pm25 != null) {
    return Math.round(pm25 * 2);
  }
  if (record?.aqi != null && OPENWEATHER_AQI_MAP[record.aqi] != null) {
    return OPENWEATHER_AQI_MAP[record.aqi];
  }
  return Math.round(record?.aqi ?? 0);
};

const formatHourLabel = (date) => {
  const hour = date.getHours();
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const meridiem = hour >= 12 ? 'PM' : 'AM';
  return `${displayHour} ${meridiem}`;
};

const transformAqiHistory = (records) => {
  if (!records || records.length === 0) {
    return { hourly: [], daily: [] };
  }

  const sorted = [...records].sort((a, b) => {
    const ta = a.timestamp ?? new Date(a.stored_at).getTime() / 1000;
    const tb = b.timestamp ?? new Date(b.stored_at).getTime() / 1000;
    return ta - tb;
  });

  const hourly = sorted.slice(-24).map((record) => {
    const timestamp = record.timestamp
      ? new Date(record.timestamp * 1000)
      : new Date(record.stored_at);
    const aqi = resolveAqiValue(record);
    return {
      time: formatHourLabel(timestamp),
      aqi,
      pm2_5: Math.round(record.pollutants?.pm2_5 ?? aqi * 0.8),
      pm10: Math.round(record.pollutants?.pm10 ?? aqi * 1.2),
    };
  });

  const dailyMap = new Map();
  sorted.forEach((record) => {
    const timestamp = record.timestamp
      ? new Date(record.timestamp * 1000)
      : new Date(record.stored_at);
    const dayKey = timestamp.toISOString().split('T')[0];
    if (!dailyMap.has(dayKey)) {
      dailyMap.set(dayKey, []);
    }
    dailyMap.get(dayKey).push(record);
  });

  const daily = Array.from(dailyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-7)
    .map(([dayKey, dayRecords]) => {
      const date = new Date(dayKey);
      const dayLabel = date.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });
      const aqis = dayRecords.map(resolveAqiValue);
      const avgAqi = Math.round(aqis.reduce((sum, value) => sum + value, 0) / aqis.length);
      const avgPm25 =
        dayRecords.reduce((sum, record) => sum + (record.pollutants?.pm2_5 ?? 0), 0) /
        dayRecords.length;
      const avgPm10 =
        dayRecords.reduce((sum, record) => sum + (record.pollutants?.pm10 ?? 0), 0) /
        dayRecords.length;
      return {
        day: dayLabel,
        aqi: avgAqi,
        pm2_5: Math.round(avgPm25),
        pm10: Math.round(avgPm10),
      };
    });

  return { hourly, daily };
};

const buildFusedLocationData = (id, fusion) => {
  const loc = mockDb.mockLocations.find(l => l.id === id);
  if (!loc) throw new Error('Location not found');

  const aqiSource = fusion?.sources?.aqi;
  const weatherSource = fusion?.sources?.weather;
  const trafficSource = fusion?.sources?.traffic;
  const pollutants = aqiSource?.pollutants || loc.pollutants;
  const aqi = resolveAqiValue({ pollutants, aqi: aqiSource?.aqi }) || loc.aqi;

  return {
    ...loc,
    lat: fusion?.location?.latitude ?? loc.lat,
    lon: fusion?.location?.longitude ?? loc.lon,
    aqi,
    confidence: fusion?.confidence ?? loc.confidence,
    lastUpdated: fusion?.collection_time ?? loc.lastUpdated,
    pollutants,
    weather: weatherSource
      ? {
          temperature: weatherSource.temperature ?? loc.weather.temperature,
          feels_like: weatherSource.feels_like ?? loc.weather.feels_like,
          humidity: weatherSource.humidity ?? loc.weather.humidity,
          pressure: weatherSource.pressure ?? loc.weather.pressure,
          wind_speed: weatherSource.wind_speed ?? loc.weather.wind_speed,
          wind_direction: weatherSource.wind_direction ?? loc.weather.wind_direction,
          cloud_cover: weatherSource.cloud_cover ?? loc.weather.cloud_cover,
          rain: weatherSource.rain ?? loc.weather.rain,
          visibility: loc.weather.visibility,
          weather: weatherSource.weather ?? loc.weather.weather,
          description: weatherSource.description ?? loc.weather.description,
        }
      : loc.weather,
    traffic: trafficSource
      ? {
          current_speed: trafficSource.current_speed ?? loc.traffic.current_speed,
          free_flow_speed: trafficSource.free_flow_speed ?? loc.traffic.free_flow_speed,
          congestion_index: loc.traffic.congestion_index,
        }
      : loc.traffic,
  };
};

export const getLocations = async () => {
  await delay();
  return mockDb.mockLocations;
};

export const getLocationDetails = async (id) => {
  if (USE_MOCK) {
    await delay();
    const loc = mockDb.mockLocations.find(l => l.id === id);
    if (!loc) throw new Error('Location not found');

    return {
      status: 'SUCCESS',
      collection_time: new Date().toISOString(),
      location: { latitude: loc.lat, longitude: loc.lon },
      confidence: loc.confidence,
      data: loc,
    };
  }

  const response = await client.get('/history/fusion/latest');
  const fusion = response.data;

  return {
    status: fusion?.status || 'SUCCESS',
    collection_time: fusion?.collection_time,
    location: fusion?.location,
    confidence: fusion?.confidence,
    data: buildFusedLocationData(id, fusion),
  };
};

export const getHistorical = async (id) => {
  if (USE_MOCK) {
    await delay();
    return mockDb.getHistoricalTrends(id);
  }
  const response = await client.get('/history/aqi');
  return transformAqiHistory(response.data);
};

export const getForecast = async (id) => {
  if (USE_MOCK) {
    await delay(150);
    return mockDb.getForecastTrends(id);
  }
  const response = await client.get('/forecast/latest');
  return response.data;
};

export const getSourceAttributionData = async (id) => {
  await delay(200);
  const attribution = mockDb.getSourceAttribution(id);
  return { attribution };
};

export const getPriorityRegions = async () => {
  await delay(300);
  return [];
};

export const getAlerts = async () => {
  await delay(150);
  return mockDb.mockAlerts;
};

export const getComplaints = async () => {
  await delay(200);
  return mockDb.mockComplaints;
};

export const submitComplaint = async (complaintData) => {
  await delay(500);
  const newComplaint = {
    id: `comp-${Date.now()}`,
    location: complaintData.location,
    category: complaintData.category,
    description: complaintData.description,
    image: complaintData.image || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=400&q=80',
    votes: 1,
    userVoted: true,
    date: new Date().toISOString().split('T')[0],
    status: 'Submitted (Under review)',
  };
  mockDb.mockComplaints.unshift(newComplaint);
  return newComplaint;
};

export const voteComplaint = async (id) => {
  await delay(100);
  const index = mockDb.mockComplaints.findIndex(c => c.id === id);
  if (index !== -1) {
    const complaint = mockDb.mockComplaints[index];
    if (complaint.userVoted) {
      complaint.votes -= 1;
      complaint.userVoted = false;
    } else {
      complaint.votes += 1;
      complaint.userVoted = true;
    }
    return complaint;
  }
  throw new Error('Complaint not found');
};

export const getClimateAnalysis = async (id) => {
  await delay(250);
  return mockDb.getClimateHistory(id);
};

export const askExplainabilityAgent = async (question, simulationState, locationName) => {
  await delay(600);
  const answer = mockDb.getExplainabilityPreset(question, simulationState, locationName);
  return { answer };
};

export const getAIHealthAdvice = async (profile, currentAqi) => {
  await delay(400);
  return mockDb.getHealthPrecaution(profile, currentAqi);
};

export const getRecommendations = async (id) => {
  await delay(300);
  const isDelhi = id === 'delhi';

  return [
    {
      id: 'rec-1',
      measure: 'Enforce Odd-Even Traffic Schedule & Heavy Commercial Restrictions',
      target: 'Traffic Emissions',
      impact: 'Reduces localized PM2.5 concentrations by an estimated 15-20 ug/m³',
      difficulty: 'Moderate Implementation',
      timeframe: 'Immediate (next 12 hours)',
      active: isDelhi,
    },
    {
      id: 'rec-2',
      measure: 'Deploy Anti-Smog Water Misting Canons on Major Traffic Corridors',
      target: 'Construction & Road Dust',
      impact: 'Reduces PM10 and heavy dust particles by 25-30% within spray radius',
      difficulty: 'Easy Implementation',
      timeframe: 'Ongoing (8 AM - 6 PM)',
      active: true,
    },
    {
      id: 'rec-3',
      measure: 'Temporary Shut-down of Coal-Fired Boiler Units in 25km Radius',
      target: 'Industrial Emissions',
      impact: 'Lowers regional SO2 and secondary sulfate aerosols by 18%',
      difficulty: 'High Administrative Override',
      timeframe: '3 Days (During peak stagnation)',
      active: isDelhi,
    },
    {
      id: 'rec-4',
      measure: 'Issue Public School Health Advisories & Restrict Morning Walks',
      target: 'Public Health Safety',
      impact: 'Reduces school-age exposure rates to hazardous pollutants by 40%',
      difficulty: 'Easy Implementation',
      timeframe: 'Immediate',
      active: isDelhi,
    },
  ];
};

export const getCombinedHourlyForecast = async (id) => {
  await delay(150);
  return mockDb.getCombinedHourlyForecast(id);
};

export const getRegionSpecificPriority = async (id) => {
  if (USE_MOCK) {
    await delay(200);
    return mockDb.getRegionSpecificPriority(id);
  }
  const response = await client.get(`/admin/priority/regions?location_id=${id}`);
  return response.data;
};

export const getAqiAffectingAttributes = async (id) => {
  await delay(150);
  return mockDb.getAqiAffectingAttributes(id);
};

export const triggerEmergencySMS = async (locationName, aqi) => {
  await delay(400);
  return mockDb.alertEmergencyContacts(locationName, aqi);
};