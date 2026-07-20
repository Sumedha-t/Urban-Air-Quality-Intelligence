// Mock Database for Urban Air Quality Intelligence Platform

export const mockLocations = [
  {
    id: "delhi",
    name: "Delhi NCR",
    state: "Delhi",
    district: "Central Delhi",
    lat: 28.6139,
    lon: 77.2090,
    aqi: 342,
    confidence: 0.94,
    lastUpdated: "2026-07-20T15:00:00+05:30",
    pollutants: {
      pm2_5: 295.4,
      pm10: 420.2,
      no2: 85.6,
      so2: 18.3,
      co: 2.4,
      o3: 98.1,
      nh3: 45.2
    },
    weather: {
      temperature: 32,
      feels_like: 36,
      humidity: 78,
      pressure: 1004,
      wind_speed: 8.5,
      wind_direction: 110,
      cloud_cover: 90,
      rain: 0,
      visibility: 3.5,
      weather: "Haze",
      description: "dense haze"
    },
    traffic: {
      current_speed: 15,
      free_flow_speed: 45,
      congestion_index: 82
    },
    subRegions: [
      { name: "Anand Vihar", lat: 28.6476, lon: 77.3158, aqi: 342 },
      { name: "Punjabi Bagh", lat: 28.6722, lon: 77.1353, aqi: 310 },
      { name: "RK Puram", lat: 28.5660, lon: 77.1751, aqi: 285 },
      { name: "Okhla Phase 3", lat: 28.5355, lon: 77.2732, aqi: 295 },
      { name: "Dwarka Sector 8", lat: 28.5707, lon: 77.0706, aqi: 260 },
      { name: "Bawana", lat: 28.7912, lon: 77.0425, aqi: 365 },
      { name: "Shadipur", lat: 28.6517, lon: 77.1581, aqi: 290 },
      { name: "Mandir Marg", lat: 28.6341, lon: 77.2005, aqi: 245 }
    ]
  },
  {
    id: "bengaluru",
    name: "Bengaluru Urban",
    state: "Karnataka",
    district: "Bengaluru Urban",
    lat: 12.9716,
    lon: 77.5946,
    aqi: 72,
    confidence: 0.91,
    lastUpdated: "2026-07-20T15:00:00+05:30",
    pollutants: {
      pm2_5: 22.8,
      pm10: 54.2,
      no2: 32.9,
      so2: 8.1,
      co: 1.0,
      o3: 42.3,
      nh3: 18.0
    },
    weather: {
      temperature: 26,
      feels_like: 26,
      humidity: 70,
      pressure: 1012,
      wind_speed: 12.6,
      wind_direction: 270,
      cloud_cover: 40,
      rain: 0,
      visibility: 10.0,
      weather: "Clouds",
      description: "partly cloudy"
    },
    traffic: {
      current_speed: 12,
      free_flow_speed: 40,
      congestion_index: 68
    },
    subRegions: [
      { name: "Silk Board Junction", lat: 12.9176, lon: 77.6244, aqi: 90 },
      { name: "Electronic City Phase 1", lat: 12.8399, lon: 77.6770, aqi: 55 },
      { name: "Jayanagar 4th Block", lat: 12.9299, lon: 77.5824, aqi: 50 },
      { name: "Indiranagar 100ft Rd", lat: 12.9718, lon: 77.6411, aqi: 62 },
      { name: "Bommasandra Industrial", lat: 12.8185, lon: 77.6791, aqi: 105 },
      { name: "Whitefield ITPL", lat: 12.9698, lon: 77.7499, aqi: 82 },
      { name: "Peenya Industrial Area", lat: 13.0285, lon: 77.5191, aqi: 82 },
      { name: "Rajajinagar", lat: 12.9900, lon: 77.5524, aqi: 58 },
      { name: "Kumbalgodu", lat: 12.8700, lon: 77.4424, aqi: 46 },
      { name: "Nelamangala", lat: 13.0900, lon: 77.3824, aqi: 62 },
      { name: "Kengeri", lat: 12.9000, lon: 77.4824, aqi: 28 },
      { name: "Bidadi", lat: 12.8000, lon: 77.4024, aqi: 39 },
      { name: "Hoskote", lat: 13.0700, lon: 77.8000, aqi: 82 }
    ]
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    district: "Mumbai City",
    lat: 18.9750,
    lon: 72.8258,
    aqi: 62,
    confidence: 0.88,
    lastUpdated: "2026-07-20T15:00:00+05:30",
    pollutants: {
      pm2_5: 18.2,
      pm10: 34.5,
      no2: 24.1,
      so2: 12.4,
      co: 0.8,
      o3: 45.6,
      nh3: 15.3
    },
    weather: {
      temperature: 29,
      feels_like: 33,
      humidity: 84,
      pressure: 1008,
      wind_speed: 18.4,
      wind_direction: 240,
      cloud_cover: 100,
      rain: 2.4,
      visibility: 8.0,
      weather: "Rain",
      description: "moderate rain showers"
    },
    traffic: {
      current_speed: 28,
      free_flow_speed: 50,
      congestion_index: 44
    },
    subRegions: [
      { name: "Colaba", lat: 18.9067, lon: 72.8147, aqi: 62 },
      { name: "Bandra Kurla Complex", lat: 19.0596, lon: 72.8682, aqi: 95 },
      { name: "Sion East", lat: 19.0354, lon: 72.8615, aqi: 110 },
      { name: "Mazagaon", lat: 19.0084, lon: 72.8436, aqi: 75 },
      { name: "Worli", lat: 19.0030, lon: 72.8150, aqi: 52 },
      { name: "Borivali East", lat: 19.2290, lon: 72.8644, aqi: 48 }
    ]
  },
  {
    id: "patna",
    name: "Patna",
    state: "Bihar",
    district: "Patna",
    lat: 25.6112,
    lon: 85.1276,
    aqi: 220,
    confidence: 0.85,
    lastUpdated: "2026-07-20T15:00:00+05:30",
    pollutants: {
      pm2_5: 165.2,
      pm10: 240.4,
      no2: 54.2,
      so2: 16.1,
      co: 1.9,
      o3: 72.4,
      nh3: 31.5
    },
    weather: {
      temperature: 34,
      feels_like: 42,
      humidity: 74,
      pressure: 1005,
      wind_speed: 6.2,
      wind_direction: 90,
      cloud_cover: 75,
      rain: 0,
      visibility: 4.5,
      weather: "Haze",
      description: "humid haze"
    },
    traffic: {
      current_speed: 18,
      free_flow_speed: 40,
      congestion_index: 55
    },
    subRegions: [
      { name: "IGIMS Campus", lat: 25.6126, lon: 85.0934, aqi: 220 },
      { name: "Muradpur", lat: 25.6200, lon: 85.1500, aqi: 240 },
      { name: "Samanpura", lat: 25.6040, lon: 85.1050, aqi: 195 },
      { name: "Rajbansi Nagar", lat: 25.6050, lon: 85.1100, aqi: 180 },
      { name: "Patna City", lat: 25.5900, lon: 85.2000, aqi: 260 }
    ]
  },
  {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    district: "Kolkata",
    lat: 22.5726,
    lon: 88.3639,
    aqi: 115,
    confidence: 0.89,
    lastUpdated: "2026-07-20T15:00:00+05:30",
    pollutants: {
      pm2_5: 41.5,
      pm10: 82.3,
      no2: 38.6,
      so2: 11.2,
      co: 1.1,
      o3: 65.2,
      nh3: 18.4
    },
    weather: {
      temperature: 30,
      feels_like: 37,
      humidity: 82,
      pressure: 1006,
      wind_speed: 12.8,
      wind_direction: 180,
      cloud_cover: 85,
      rain: 0.5,
      visibility: 6.0,
      weather: "Clouds",
      description: "light rain showers"
    },
    traffic: {
      current_speed: 20,
      free_flow_speed: 45,
      congestion_index: 68
    },
    subRegions: [
      { name: "Victoria Memorial", lat: 22.5448, lon: 88.3426, aqi: 115 },
      { name: "Salt Lake Sector 5", lat: 22.5735, lon: 88.4331, aqi: 135 },
      { name: "Howrah Bridge", lat: 22.5850, lon: 88.3468, aqi: 160 },
      { name: "Ballygunge", lat: 22.5280, lon: 88.3659, aqi: 92 },
      { name: "Jadavpur", lat: 22.4955, lon: 88.3709, aqi: 98 },
      { name: "Tollygunge", lat: 22.4930, lon: 88.3475, aqi: 88 }
    ]
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    district: "Chennai",
    lat: 13.0827,
    lon: 80.2707,
    aqi: 55,
    confidence: 0.90,
    lastUpdated: "2026-07-20T15:00:00+05:30",
    pollutants: {
      pm2_5: 14.1,
      pm10: 28.6,
      no2: 19.3,
      so2: 24.5,
      co: 0.6,
      o3: 38.2,
      nh3: 11.2
    },
    weather: {
      temperature: 33,
      feels_like: 40,
      humidity: 70,
      pressure: 1009,
      wind_speed: 16.5,
      wind_direction: 140,
      cloud_cover: 50,
      rain: 0,
      visibility: 9.0,
      weather: "Clouds",
      description: "scattered clouds"
    },
    traffic: {
      current_speed: 25,
      free_flow_speed: 50,
      congestion_index: 50
    },
    subRegions: [
      { name: "Manali Industrial Zone", lat: 13.1656, lon: 80.2654, aqi: 72 },
      { name: "T Nagar", lat: 13.0418, lon: 80.2341, aqi: 55 },
      { name: "Velachery", lat: 12.9802, lon: 80.2228, aqi: 48 },
      { name: "Adyar", lat: 13.0063, lon: 80.2574, aqi: 42 },
      { name: "Royapuram", lat: 13.1146, lon: 80.2947, aqi: 68 }
    ]
  }
];

// Helper to get AQI category
export const getAqiCategory = (aqi) => {
  if (aqi <= 50) return { label: "Good", color: "text-emerald-600 bg-emerald-50 border-emerald-200", badge: "bg-emerald-500", hex: "#10B981" };
  if (aqi <= 100) return { label: "Moderate", color: "text-amber-600 bg-amber-50 border-amber-200", badge: "bg-amber-500", hex: "#FBBF24" };
  if (aqi <= 150) return { label: "Poor", color: "text-orange-600 bg-orange-50 border-orange-200", badge: "bg-orange-500", hex: "#F97316" };
  if (aqi <= 200) return { label: "Unhealthy", color: "text-red-600 bg-red-50 border-red-200", badge: "bg-red-500", hex: "#EF4444" };
  if (aqi <= 300) return { label: "Severe", color: "text-purple-600 bg-purple-50 border-purple-200", badge: "bg-purple-500", hex: "#8B5CF6" };
  return { label: "Hazardous", color: "text-rose-950 bg-rose-50 border-rose-200", badge: "bg-rose-900", hex: "#881337" };
};

// Hourly and Predicted Forecast table trends combined
export const getCombinedHourlyForecast = (locationId) => {
  const baseAqi = mockLocations.find(l => l.id === locationId)?.aqi || 100;
  const baseTemp = mockLocations.find(l => l.id === locationId)?.weather.temperature || 28;

  // Let's create an array showing:
  // - 5 historical hours (isPrediction: false)
  // - Current hour (isPrediction: false)
  // - 6 future hours (isPrediction: true)
  const times = [
    { time: "10:00 AM", temp: baseTemp - 3, condition: "Light drizzle", aqi: baseAqi - 15, isPrediction: false },
    { time: "11:00 AM", temp: baseTemp - 2, condition: "Moderate drizzle", aqi: baseAqi - 8, isPrediction: false },
    { time: "12:00 PM", temp: baseTemp - 1, condition: "Dense drizzle", aqi: baseAqi - 2, isPrediction: false },
    { time: "01:00 PM", temp: baseTemp, condition: "Light drizzle", aqi: baseAqi, isPrediction: false },
    { time: "02:00 PM", temp: baseTemp + 1, condition: "Light drizzle", aqi: baseAqi + 5, isPrediction: false },
    { time: "Now", temp: baseTemp, condition: "Light drizzle", aqi: baseAqi, isPrediction: false },
    { time: "04:00 PM", temp: baseTemp - 1, condition: "Dense drizzle", aqi: baseAqi + 8, isPrediction: true },
    { time: "05:00 PM", temp: baseTemp - 2, condition: "Moderate drizzle", aqi: baseAqi + 12, isPrediction: true },
    { time: "06:00 PM", temp: baseTemp - 2, condition: "Light drizzle", aqi: baseAqi + 15, isPrediction: true },
    { time: "07:00 PM", temp: baseTemp - 3, condition: "Light drizzle", aqi: baseAqi + 18, isPrediction: true },
    { time: "08:00 PM", temp: baseTemp - 4, condition: "Clear Air", aqi: baseAqi + 10, isPrediction: true },
    { time: "09:00 PM", temp: baseTemp - 4, condition: "Clear Air", aqi: baseAqi + 5, isPrediction: true }
  ];

  return times;
};

// Historical trends for 24h & 7d
export const getHistoricalTrends = (locationId) => {
  const baseAqi = mockLocations.find(l => l.id === locationId)?.aqi || 100;
  
  // 24 Hour Hourly
  const hourly = Array.from({ length: 24 }, (_, i) => {
    const hour = (15 + i) % 24;
    const timeLabel = `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour} ${hour >= 12 ? 'PM' : 'AM'}`;
    const variance = Math.sin(i / 3) * 15 + (Math.random() - 0.5) * 5;
    return {
      time: timeLabel,
      aqi: Math.round(Math.max(10, baseAqi + variance)),
      pm2_5: Math.round(Math.max(5, (baseAqi + variance) * 0.8)),
      pm10: Math.round(Math.max(10, (baseAqi + variance) * 1.2))
    };
  });

  // 7 Days
  const daily = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayLabel = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    const variance = Math.cos(i / 2) * 25 + (Math.random() - 0.5) * 10;
    return {
      day: dayLabel,
      aqi: Math.round(Math.max(10, baseAqi + variance)),
      pm2_5: Math.round(Math.max(5, (baseAqi + variance) * 0.85)),
      pm10: Math.round(Math.max(10, (baseAqi + variance) * 1.3))
    };
  });

  return { hourly, daily };
};

// Forecast trends: separating historical trend (past 12h) and future predicted trend (next 24h)
export const getForecastTrends = (locationId) => {
  const baseAqi = mockLocations.find(l => l.id === locationId)?.aqi || 100;
  
  // Renders a combined array of past 12h (historical) and future 24h (predicted)
  const combined = [];
  
  // Past 12 Hours
  for (let i = 12; i >= 1; i--) {
    const hr = (15 - i + 24) % 24;
    const timeLabel = `${hr === 0 ? 12 : hr > 12 ? hr - 12 : hr} ${hr >= 12 ? 'PM' : 'AM'}`;
    const variance = Math.sin((12 - i) / 2) * 12;
    combined.push({
      time: timeLabel,
      aqi: Math.round(Math.max(10, baseAqi - 15 + variance)),
      isFuture: false,
      confidence: 100
    });
  }

  // Future 24 Hours
  for (let i = 0; i < 24; i++) {
    const hr = (15 + i) % 24;
    const timeLabel = `${hr === 0 ? 12 : hr > 12 ? hr - 12 : hr} ${hr >= 12 ? 'PM' : 'AM'}`;
    const variance = Math.sin(i / 3) * 20 + i * 0.8;
    const confidence = Math.max(0.6, 0.95 - (i * 0.015));
    combined.push({
      time: timeLabel,
      aqi: Math.round(Math.max(10, baseAqi + variance)),
      isFuture: true,
      confidence: Math.round(confidence * 100)
    });
  }

  // 3-day daily forecast
  const threeDays = Array.from({ length: 3 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const dayLabel = d.toLocaleDateString('en-IN', { weekday: 'long' });
    const variance = Math.sin(i * 1.5) * 15 + i * 2.5;
    const confidence = 0.90 - i * 0.05;
    return {
      day: dayLabel,
      aqi: Math.round(Math.max(10, baseAqi + variance)),
      confidence: Math.round(confidence * 100),
      pm2_5: Math.round(Math.max(5, (baseAqi + variance) * 0.8)),
      pm10: Math.round(Math.max(10, (baseAqi + variance) * 1.25)),
      peakHour: "08:00 AM"
    };
  });

  // 7-day daily forecast
  const sevenDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const dayLabel = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    const variance = Math.cos(i) * 30 + i * 4.0;
    const confidence = Math.max(0.5, 0.92 - i * 0.06);
    return {
      day: dayLabel,
      aqi: Math.round(Math.max(10, baseAqi + variance)),
      confidence: Math.round(confidence * 100),
      pm2_5: Math.round(Math.max(5, (baseAqi + variance) * 0.78)),
      pm10: Math.round(Math.max(10, (baseAqi + variance) * 1.22)),
      peakHour: i % 2 === 0 ? "09:00 AM" : "07:00 PM"
    };
  });

  return { combined, threeDays, sevenDays };
};

// Source Attribution breakdowns
export const getSourceAttribution = (locationId) => {
  if (locationId === "delhi") {
    return {
      traffic: 32,
      industries: 18,
      construction: 22,
      residential: 8,
      biomass_burning: 12,
      weather: 5,
      natural: 3
    };
  }
  if (locationId === "bengaluru") {
    return {
      traffic: 45,
      industries: 10,
      construction: 25,
      residential: 10,
      biomass_burning: 2,
      weather: 4,
      natural: 4
    };
  }
  
  return {
    traffic: 28,
    industries: 24,
    construction: 18,
    residential: 12,
    biomass_burning: 6,
    weather: 8,
    natural: 4
  };
};

// Percentage of Data Attributes Affecting AQI for Citizen view
export const getAqiAffectingAttributes = (locationId) => {
  if (locationId === "delhi") {
    return [
      { name: "Traffic Density", value: 35, color: "bg-maroon-600" },
      { name: "Meteorological Conditions", value: 20, color: "bg-blue-500" },
      { name: "Industrial Pollution", value: 18, color: "bg-amber-500" },
      { name: "Land Use", value: 15, color: "bg-emerald-500" },
      { name: "Satellite Thermal Gradients", value: 12, color: "bg-purple-500" }
    ];
  }
  // Default values
  return [
    { name: "Traffic Density", value: 45, color: "bg-maroon-600" },
    { name: "Land Use", value: 20, color: "bg-emerald-500" },
    { name: "Meteorological Conditions", value: 15, color: "bg-blue-500" },
    { name: "Industrial Pollution", value: 12, color: "bg-amber-500" },
    { name: "Satellite Thermal Gradients", value: 8, color: "bg-purple-500" }
  ];
};

// Region Specific priority list (Ranks sub-regions inside active city)
export const getRegionSpecificPriority = (locationId) => {
  const loc = mockLocations.find(l => l.id === locationId) || mockLocations[0];
  const subs = loc.subRegions || [];

  return subs.map((s, index) => {
    const isRising = index % 2 === 0;
    return {
      rank: index + 1,
      location: `${s.name}, ${loc.state}`,
      district: loc.district,
      aqi: s.aqi,
      trend: isRising ? "Rising" : "Declining",
      industrialContrib: Math.round(10 + Math.random() * 25),
      populationDensity: Math.round(8000 + Math.random() * 15000),
      complaintsCount: Math.round(5 + Math.random() * 50),
      votesCount: Math.round(10 + Math.random() * 200),
      score: Math.round(40 + (s.aqi / 400) * 50)
    };
  });
};

// Active Alerts list
export const mockAlerts = [
  {
    id: "alert-1",
    level: "CRITICAL",
    type: "Severe Pollution Warning",
    message: "AQI exceeds 300 in Anand Vihar, Delhi. Public is advised to stay indoors, use air purifiers, and wear N95 masks.",
    time: "2 hours ago",
    scope: "Anand Vihar & nearby regions"
  },
  {
    id: "alert-2",
    level: "WARNING",
    type: "Heavy Congestion & Traffic Advisory",
    message: "Silk Board junction, Bengaluru traffic speeds dropped below 10km/h. High localized particulate buildup expected.",
    time: "3 hours ago",
    scope: "Outer Ring Road, Bengaluru"
  },
  {
    id: "alert-3",
    level: "INFO",
    type: "Government Mitigative Action",
    message: "Water sprinklers and mist-canons deployed on 12 key corridors in Delhi NCR.",
    time: "5 hours ago",
    scope: "Delhi NCR"
  }
];

// Mock Citizen Complaints Database
export const mockComplaints = [
  {
    id: "comp-1",
    location: "Sector 14, Dwarka, Delhi",
    category: "Construction Dust",
    description: "Massive road construction going on without green screen covers. Extremely thick dust clouds during daytime.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80",
    votes: 245,
    userVoted: false,
    date: "2026-07-19",
    status: "Pending Investigation"
  },
  {
    id: "comp-2",
    location: "Peenya Industrial Area, Bengaluru",
    category: "Chemical Smoke Emission",
    description: "A small metal forging unit is emitting pitch black smoke continuously during midnight hours.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80",
    votes: 589, // High voting
    userVoted: true,
    date: "2026-07-18",
    status: "Inspected & Warning Issued"
  },
  {
    id: "comp-3",
    location: "Ghatkopar East, Mumbai",
    category: "Waste Burning",
    description: "Garbage piled near the railway lines is set on fire every alternate morning, causing bad fumes.",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=400&q=80",
    votes: 94,
    userVoted: false,
    date: "2026-07-20",
    status: "Action Scheduled"
  }
];

// 17-Year historical climate extremes matching Image 4
export const getClimateHistory = (locationId) => {
  const isHigh = ["delhi", "patna"].includes(locationId);
  const startYear = 2010;
  
  // Returns 17 records from 2010 to 2026
  return Array.from({ length: 17 }, (_, i) => {
    const year = startYear + i;
    // Generate sin wave with small upward trends
    const tempBase = isHigh ? 28.2 : 25.5;
    const humidityBase = isHigh ? 65 : 74;
    const rainBase = isHigh ? 720 : 1100;
    const windBase = isHigh ? 8.2 : 14.5;
    const uvBase = 5;

    const tempSin = Math.sin(i / 2) * 1.8 + i * 0.12;
    const humSin = Math.cos(i / 3) * 8 - i * 0.15;
    const rainSin = Math.sin(i * 1.2) * 120 - i * 5;
    const windSin = Math.cos(i) * 1.5;
    const uvSin = Math.sin(i) * 0.8;
    const aqiSin = Math.sin(i / 1.5) * 20 + i * 4.5;

    return {
      year,
      temperature: Number((tempBase + tempSin).toFixed(1)),
      humidity: Math.round(humidityBase + humSin),
      precipitation: Math.round(rainBase + rainSin),
      windSpeed: Number((windBase + windSin).toFixed(1)),
      uv: Number((uvBase + uvSin).toFixed(1)),
      aqi: Math.round(isHigh ? 180 + aqiSin : 70 + aqiSin)
    };
  });
};

// Emergency alerting mock logic
export const alertEmergencyContacts = async (locationName, aqi) => {
  // Simulate dispatching SMS or notifications to safety nodes
  console.log(`EMERGENCY SMS SENT: AQI is ${aqi} in ${locationName}. Advising safety precautions!`);
  return {
    success: true,
    sentTo: ["+91 99887 76655", "+91 98765 43210"],
    message: `ALERT: Critical Air Quality Index of ${aqi} detected at ${locationName}. Remain indoors with windows sealed.`
  };
};

// AI health precautions generator standard replies with time-specific parameters
export const getHealthPrecaution = (profile, currentAqi) => {
  const details = {};
  
  if (currentAqi <= 50) {
    details.status = "Excellent";
    details.precautions = "Air quality is fully safe.";
    details.maskRequired = "No mask required.";
    details.outdoorTime = "Unlimited outdoor exposure.";
    
    // Time specific guidelines
    details.timeSpecific = {
      morning: "Ideal window for morning physical training and outdoor running.",
      afternoon: "Perfect weather for standard travel and activities.",
      evening: "Safe for outdoor recreational activities.",
      night: "No issues, safe ventilation."
    };
  } else if (currentAqi <= 100) {
    details.status = "Acceptable";
    details.precautions = "Safe for most. Sensitive individuals (e.g. chronic asthmatics) should keep rescue inhalers nearby.";
    details.maskRequired = "No mask needed for general public.";
    details.outdoorTime = "Safe for outdoor activities.";

    details.timeSpecific = {
      morning: "Morning air is crisp. Safe for outdoor walks.",
      afternoon: "Safe for standard commutes.",
      evening: "Safe for park visits.",
      night: "Restful air conditions."
    };
  } else if (currentAqi <= 150) {
    details.status = "Caution";
    details.precautions = "Sensitive individuals may experience irritation. Limit intense cardio, take frequent breaks.";
    details.maskRequired = "Surgical mask recommended if spending more than 2 hours outside.";
    details.outdoorTime = "Limit outdoor exposure to under 3 hours.";

    details.timeSpecific = {
      morning: "Light haze. Asthmatics should replace outdoor jogs with indoor yoga.",
      afternoon: "Safe for quick errands; wear a basic mask.",
      evening: "Avoid lingering outdoors in busy traffic corridors.",
      night: "Keep windows closed."
    };
  } else if (currentAqi <= 200) {
    details.status = "Unhealthy";
    details.precautions = "General public will start feeling chest tightness. Suspend outdoor jogs and replace with indoor exercises.";
    details.maskRequired = "N95/N99 respirators are highly recommended for any outdoor activity.";
    details.outdoorTime = "Avoid outdoor activities for sensitive groups. Limit to essential tasks.";

    details.timeSpecific = {
      morning: "Morning ground-inversion traps thick smog. Strictly do not perform morning runs.",
      afternoon: "Sunlight somewhat disperses particles. Wear an N95 mask if heading out.",
      evening: "Heavy traffic triggers rapid PM2.5 spikes. Avoid walking near main roads.",
      night: "Run air purifiers on medium-high speed."
    };
  } else {
    details.status = "Severe / Hazardous";
    details.precautions = "Extreme risk. Seal all doors/windows. Run air purifiers on high.";
    details.maskRequired = "Double mask or N95 mask is absolutely mandatory for outdoor transit.";
    details.outdoorTime = "Strictly stay indoors. Avoid outdoor air completely.";

    details.timeSpecific = {
      morning: "Smog dome at its densest. Strictly stay indoors. Keep windows closed.",
      afternoon: "High particle concentrations remain. Keep outdoor transit below 10 mins.",
      evening: "Extremely toxic air. Run HEPA filters at maximum speed.",
      night: "Do not ventilate. Sleep with purifiers running."
    };
  }

  // Personalize based on health profile
  if (profile.asthma || profile.copd || profile.bronchitis) {
    details.precautions = `[HIGH RISK ALERT: RESPIRATORY DIAGNOSIS] ${details.precautions} Ensure your bronchodilator is accessible.`;
  }

  return details;
};

// Presets for the AI Explainability Agent questions
export const getExplainabilityPreset = (question, simulationState, locationName = "Delhi") => {
  const { trafficReduction = 0, industrialReduction = 0 } = simulationState || {};
  
  if (question.includes("pm2.5") || question.includes("calculate")) {
    return `### Air Quality Index (AQI) Calculation Methodology

The overall Air Quality Index (AQI) is computed using the **Ind-AQI standard** (established by Central Pollution Control Board) which maps pollutant concentrations to sub-indices. Currently, for **${locationName}**, the dominant pollutant is **PM2.5** which dictates the severe AQI score.

*   **Traffic emissions reduced by ${trafficReduction}%**: Reduces localized PM2.5 concentrations by approximately $0.32 \\times ${trafficReduction}\\%$.
*   **Industrial emissions reduced by ${industrialReduction}%**: Reduces SO2 & PM10 concentrations.`;
  }

  if (question.includes("what-if") || question.includes("simulate") || question.includes("reduce")) {
    const netAqiDecrease = Math.round((trafficReduction * 0.8) + (industrialReduction * 0.5));
    return `### "What-If" Simulation Results for ${locationName}

By enforcing the simulated emission caps, we predict the following changes in the local microclimate:

*   **Traffic Reduction (${trafficReduction}%):** Projected to lower Nitrogen Dioxide ($NO_2$) by ${Math.round(trafficReduction * 0.7)}% and primary fine particulate ($PM2.5$) emissions by ${Math.round(trafficReduction * 0.4)}%.
*   **Industrial Caps (${industrialReduction}%):** Projected to reduce Sulfur Dioxide ($SO_2$) by ${Math.round(industrialReduction * 0.85)}% and course dust ($PM10$) by ${Math.round(industrialReduction * 0.3)}%.

#### Final Evaluation:
*   **Aerosol Concentration Drop:** Estimated PM2.5 levels will fall from the baseline of **295.4 $\\mu$g/m³** down to **${(295.4 * (1 - (trafficReduction * 0.003 + industrialReduction * 0.0015))).toFixed(1)} $\\mu$g/m³**.
*   **Target AQI Change:** The overall index will decrease by **-${netAqiDecrease} AQI points**, yielding an adjusted AQI of **${Math.max(45, 342 - netAqiDecrease)}**.`;
  }

  return `### AI Diagnostics Analysis

For **${locationName}**, the primary driver of ambient pollution is **Traffic Congestion** combined with **Construction Dust**. 

*   **Stagnant Meteorological Conditions:** The wind speed is currently low, creating an inversion layer that locks particles near ground level.
*   **Mitigation Strategy:** Reducing traffic density by even 25% through high-occupancy restrictions along busy lanes would reduce localized PM2.5 by roughly 20 $\\mu$g/m³ within 4 hours.`;
};
