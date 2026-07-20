import axios from 'axios';
import * as mockDb from './mockData';

// API configurations
const API_URL = import.meta.env.VITE_API_URL || '/api';
const USE_MOCK = true; // Toggle this to connect to the backend FastAPI server

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper for simulating async API lag
const delay = (ms = 350) => new Promise(resolve => setTimeout(resolve, ms));

export const getLocations = async () => {
  if (USE_MOCK) {
    await delay();
    return mockDb.mockLocations;
  }
  const response = await client.get('/locations');
  return response.data;
};

export const getLocationDetails = async (id) => {
  if (USE_MOCK) {
    await delay();
    const loc = mockDb.mockLocations.find(l => l.id === id);
    if (!loc) throw new Error("Location not found");
    
    // Simulate a data fusion model
    return {
      status: "SUCCESS",
      collection_time: new Date().toISOString(),
      location: { latitude: loc.lat, longitude: loc.lon },
      confidence: loc.confidence,
      data: loc
    };
  }
  // Connect to the backend FastAPI /fusion endpoint
  const loc = mockDb.mockLocations.find(l => l.id === id);
  if (!loc) throw new Error("Location not found");
  const response = await client.get(`/fusion?latitude=${loc.lat}&longitude=${loc.lon}`);
  return response.data;
};

export const getHistorical = async (id) => {
  if (USE_MOCK) {
    await delay();
    return mockDb.getHistoricalTrends(id);
  }
  const response = await client.get(`/aqi/historical?location_id=${id}`);
  return response.data;
};

export const getForecast = async (id) => {
  if (USE_MOCK) {
    await delay();
    return mockDb.getForecastTrends(id);
  }
  const response = await client.get(`/aqi/forecast?location_id=${id}`);
  return response.data;
};

export const getSourceAttributionData = async (id) => {
  if (USE_MOCK) {
    await delay(200);
    const attribution = mockDb.getSourceAttribution(id);
    return { attribution };
  }
  const response = await client.get(`/aqi/attribution?location_id=${id}`);
  return response.data;
};

export const getPriorityRegions = async () => {
  if (USE_MOCK) {
    await delay(300);
    return [];
  }
  const response = await client.get('/admin/priority');
  return response.data;
};

export const getAlerts = async () => {
  if (USE_MOCK) {
    await delay(150);
    return mockDb.mockAlerts;
  }
  const response = await client.get('/alerts');
  return response.data;
};

export const getComplaints = async () => {
  if (USE_MOCK) {
    await delay(200);
    return mockDb.mockComplaints;
  }
  const response = await client.get('/citizen/complaints');
  return response.data;
};

export const submitComplaint = async (complaintData) => {
  if (USE_MOCK) {
    await delay(500);
    const newComplaint = {
      id: `comp-${Date.now()}`,
      location: complaintData.location,
      category: complaintData.category,
      description: complaintData.description,
      image: complaintData.image || "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=400&q=80",
      votes: 1,
      userVoted: true,
      date: new Date().toISOString().split('T')[0],
      status: "Submitted (Under review)"
    };
    mockDb.mockComplaints.unshift(newComplaint);
    return newComplaint;
  }
  const response = await client.post('/citizen/complaints', complaintData);
  return response.data;
};

export const voteComplaint = async (id) => {
  if (USE_MOCK) {
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
    throw new Error("Complaint not found");
  }
  const response = await client.post(`/citizen/complaints/${id}/vote`);
  return response.data;
};

export const getClimateAnalysis = async (id) => {
  if (USE_MOCK) {
    await delay(250);
    return mockDb.getClimateHistory(id);
  }
  const response = await client.get(`/citizen/climate?location_id=${id}`);
  return response.data;
};

export const askExplainabilityAgent = async (question, simulationState, locationName) => {
  if (USE_MOCK) {
    await delay(600);
    const answer = mockDb.getExplainabilityPreset(question, simulationState, locationName);
    return { answer };
  }
  const response = await client.post('/ai/explain', { question, simulation_state: simulationState, location_name: locationName });
  return response.data;
};

export const getAIHealthAdvice = async (profile, currentAqi) => {
  if (USE_MOCK) {
    await delay(400);
    return mockDb.getHealthPrecaution(profile, currentAqi);
  }
  const response = await client.post('/ai/health-advice', { profile, aqi: currentAqi });
  return response.data;
};

export const getRecommendations = async (id) => {
  if (USE_MOCK) {
    await delay(300);
    const loc = mockDb.mockLocations.find(l => l.id === id);
    const isDelhi = id === "delhi";
    
    return [
      {
        id: "rec-1",
        measure: "Enforce Odd-Even Traffic Schedule & Heavy Commercial Restrictions",
        target: "Traffic Emissions",
        impact: "Reduces localized PM2.5 concentrations by an estimated 15-20 ug/m³",
        difficulty: "Moderate Implementation",
        timeframe: "Immediate (next 12 hours)",
        active: isDelhi
      },
      {
        id: "rec-2",
        measure: "Deploy Anti-Smog Water Misting Canons on Major Traffic Corridors",
        target: "Construction & Road Dust",
        impact: "Reduces PM10 and heavy dust particles by 25-30% within spray radius",
        difficulty: "Easy Implementation",
        timeframe: "Ongoing (8 AM - 6 PM)",
        active: true
      },
      {
        id: "rec-3",
        measure: "Temporary Shut-down of Coal-Fired Boiler Units in 25km Radius",
        target: "Industrial Emissions",
        impact: "Lowers regional SO2 and secondary sulfate aerosols by 18%",
        difficulty: "High Administrative Override",
        timeframe: "3 Days (During peak stagnation)",
        active: isDelhi
      },
      {
        id: "rec-4",
        measure: "Issue Public School Health Advisories & Restrict Morning Walks",
        target: "Public Health Safety",
        impact: "Reduces school-age exposure rates to hazardous pollutants by 40%",
        difficulty: "Easy Implementation",
        timeframe: "Immediate",
        active: isDelhi
      }
    ];
  }
  const response = await client.get(`/ai/recommendations?location_id=${id}`);
  return response.data;
};

export const getCombinedHourlyForecast = async (id) => {
  if (USE_MOCK) {
    await delay(150);
    return mockDb.getCombinedHourlyForecast(id);
  }
  const response = await client.get(`/aqi/forecast/hourly?location_id=${id}`);
  return response.data;
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
  if (USE_MOCK) {
    await delay(150);
    return mockDb.getAqiAffectingAttributes(id);
  }
  const response = await client.get(`/citizen/affecting-attributes?location_id=${id}`);
  return response.data;
};

export const triggerEmergencySMS = async (locationName, aqi) => {
  if (USE_MOCK) {
    await delay(400);
    return mockDb.alertEmergencyContacts(locationName, aqi);
  }
  const response = await client.post('/ai/health/alert-emergency', { location_name: locationName, aqi });
  return response.data;
};
