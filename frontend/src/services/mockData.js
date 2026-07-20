// Mock Database for Urban Air Quality Intelligence Platform

export const mockLocations = [
  {
    id: "delhi",
    name: "Delhi (Anand Vihar)",
    state: "Delhi",
    district: "East Delhi",
    lat: 28.6476,
    lon: 77.3158,
    aqi: 342, // Severe
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
      visibility: 3.5, // km
      weather: "Haze",
      description: "dense haze with high humidity"
    },
    traffic: {
      current_speed: 15, // km/h
      free_flow_speed: 45,
      current_travel_time: 240, // seconds for a segment
      free_flow_travel_time: 80,
      confidence: 0.90,
      road_closure: false,
      congestion_index: 82 // percentage
    }
  },
  {
    id: "mumbai",
    name: "Mumbai (Colaba)",
    state: "Maharashtra",
    district: "Mumbai City",
    lat: 18.9067,
    lon: 72.8147,
    aqi: 62, // Moderate
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
      current_travel_time: 180,
      free_flow_travel_time: 100,
      confidence: 0.92,
      road_closure: false,
      congestion_index: 44
    }
  },
  {
    id: "bengaluru",
    name: "Bengaluru (K宣传/Silk Board)",
    state: "Karnataka",
    district: "Bengaluru Urban",
    lat: 12.9176,
    lon: 77.6244,
    aqi: 94, // Moderate (close to Poor)
    confidence: 0.91,
    lastUpdated: "2026-07-20T15:00:00+05:30",
    pollutants: {
      pm2_5: 32.8,
      pm10: 68.2,
      no2: 48.9,
      so2: 9.1,
      co: 1.2,
      o3: 52.3,
      nh3: 21.0
    },
    weather: {
      temperature: 26,
      feels_like: 26,
      humidity: 62,
      pressure: 1012,
      wind_speed: 15.2,
      wind_direction: 270,
      cloud_cover: 40,
      rain: 0,
      visibility: 10.0,
      weather: "Clouds",
      description: "partly cloudy"
    },
    traffic: {
      current_speed: 9,
      free_flow_speed: 40,
      current_travel_time: 520,
      free_flow_travel_time: 120,
      confidence: 0.95,
      road_closure: false,
      congestion_index: 92
    }
  },
  {
    id: "patna",
    name: "Patna (IGIMS)",
    state: "Bihar",
    district: "Patna",
    lat: 25.6126,
    lon: 85.0934,
    aqi: 220, // Poor/Very Poor boundary
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
      current_travel_time: 290,
      free_flow_travel_time: 130,
      confidence: 0.82,
      road_closure: false,
      congestion_index: 55
    }
  },
  {
    id: "kolkata",
    name: "Kolkata (Victoria Memorial)",
    state: "West Bengal",
    district: "Kolkata",
    lat: 22.5448,
    lon: 88.3426,
    aqi: 115, // Poor
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
      current_travel_time: 210,
      free_flow_travel_time: 95,
      confidence: 0.87,
      road_closure: false,
      congestion_index: 68
    }
  },
  {
    id: "chennai",
    name: "Chennai (Manali)",
    state: "Tamil Nadu",
    district: "Chennai",
    lat: 13.1656,
    lon: 80.2654,
    aqi: 55, // Moderate
    confidence: 0.90,
    lastUpdated: "2026-07-20T15:00:00+05:30",
    pollutants: {
      pm2_5: 14.1,
      pm10: 28.6,
      no2: 19.3,
      so2: 24.5, // Industrial zone has higher SO2
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
      current_travel_time: 240,
      free_flow_travel_time: 120,
      confidence: 0.91,
      road_closure: false,
      congestion_index: 50
    }
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

// Historical trends for 24h & 7d
export const getHistoricalTrends = (locationId) => {
  const baseAqi = mockLocations.find(l => l.id === locationId)?.aqi || 100;
  
  // 24 Hour Hourly
  const hourly = Array.from({ length: 24 }, (_, i) => {
    const hour = (15 + i) % 24;
    const timeLabel = `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour} ${hour >= 12 ? 'PM' : 'AM'}`;
    // Add random sin wave oscillation to make it look realistic
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

// Forecast trends: next 24 hours, 3 days, 7 days
export const getForecastTrends = (locationId) => {
  const baseAqi = mockLocations.find(l => l.id === locationId)?.aqi || 100;
  
  // 24h hourly forecast
  const hourly = Array.from({ length: 24 }, (_, i) => {
    const hour = (16 + i) % 24;
    const timeLabel = `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour} ${hour >= 12 ? 'PM' : 'AM'}`;
    const variance = Math.sin(i / 3) * 20 + i * 0.8 + (Math.random() - 0.5) * 4;
    const confidence = Math.max(0.6, 0.95 - (i * 0.015));
    return {
      time: timeLabel,
      aqi: Math.round(Math.max(10, baseAqi + variance)),
      confidence: Math.round(confidence * 100)
    };
  });

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

  return { hourly, threeDays, sevenDays };
};

// Source Attribution breakdowns
export const getSourceAttribution = (locationId) => {
  // Default breakdowns based on city traits
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
  if (locationId === "chennai") {
    return {
      traffic: 25,
      industries: 35,
      construction: 15,
      residential: 12,
      biomass_burning: 3,
      weather: 6,
      natural: 4
    };
  }
  
  // Generic distribution
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

// Construction Estimator Parameters (Satellite & Particulate correlation indices)
export const getConstructionEstimator = (locationId) => {
  const isHigh = ["delhi", "bengaluru"].includes(locationId);
  return {
    satelliteSVI: isHigh ? 0.38 : 0.65, // Vegetation index (lower is worse)
    bareSoilRatio: isHigh ? 42 : 18, // Bare soil percentage
    urbanDensityFactor: isHigh ? 84 : 55, // Density coefficient
    pmCorrelationCoefficient: isHigh ? 0.88 : 0.62,
    detectedActiveSites: isHigh ? 184 : 42,
    estimatedPMContribution: isHigh ? 48.5 : 18.2 // ug/m3
  };
};

// Priority list for administrator warnings and citizen votes
export const mockPriorityDashboard = [
  { rank: 1, location: "Delhi (Anand Vihar)", district: "East Delhi", aqi: 342, trend: "Rising", industrialContrib: 18, populationDensity: 28000, complaintsCount: 142, votesCount: 840, score: 94.5 },
  { rank: 2, location: "Patna (IGIMS)", district: "Patna", aqi: 220, trend: "Stable", industrialContrib: 15, populationDensity: 18500, complaintsCount: 98, votesCount: 520, score: 78.2 },
  { rank: 3, location: "Kolkata (Victoria Memorial)", district: "Kolkata", aqi: 115, trend: "Rising", industrialContrib: 24, populationDensity: 24000, complaintsCount: 65, votesCount: 310, score: 62.1 },
  { rank: 4, location: "Bengaluru (Silk Board)", district: "Bengaluru Urban", aqi: 94, trend: "Rising", industrialContrib: 10, populationDensity: 19000, complaintsCount: 120, votesCount: 680, score: 58.4 },
  { rank: 5, location: "Mumbai (Colaba)", district: "Mumbai City", aqi: 62, trend: "Declining", industrialContrib: 12, populationDensity: 21000, complaintsCount: 42, votesCount: 150, score: 38.6 }
];

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
    votes: 189,
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

// Climate historical changes (comparing past 5 years)
export const getClimateHistory = (locationId) => {
  const isHigh = ["delhi", "patna"].includes(locationId);
  const startYear = 2021;
  
  return Array.from({ length: 6 }, (_, i) => {
    const year = startYear + i;
    // Multipliers representing trends (worsening AQI & Temp, lower rainfall, lower green cover)
    const factor = i * 0.05;
    return {
      year,
      aqi: isHigh ? Math.round(180 + i * 15 + Math.random() * 10) : Math.round(75 + i * 4 + Math.random() * 5),
      temperature: Number((isHigh ? 31.2 + i * 0.28 + Math.random() * 0.1 : 28.5 + i * 0.15 + Math.random() * 0.1).toFixed(2)),
      rainfall: Math.round(isHigh ? 780 - i * 22 - Math.random() * 15 : 1240 - i * 10 - Math.random() * 20),
      greenCover: Number((isHigh ? 21.4 - i * 0.6 : 34.2 - i * 0.3).toFixed(1)),
      heatIslandIndex: Number((isHigh ? 3.2 + i * 0.35 : 1.8 + i * 0.18).toFixed(1))
    };
  });
};

// AI health precautions generator standard replies
export const getHealthPrecaution = (profile, currentAqi) => {
  const precautions = [];
  const details = {};
  
  if (currentAqi <= 50) {
    details.status = "Excellent";
    details.precautions = "Air quality is fully safe. Ideal for all outdoor exercises, running, and physical training.";
    details.maskRequired = "No mask required.";
    details.outdoorTime = "Unlimited outdoor exposure.";
  } else if (currentAqi <= 100) {
    details.status = "Acceptable";
    details.precautions = "Safe for most. Sensitive individuals (e.g. chronic asthmatics) should keep rescue inhalers nearby and monitor for any wheezing.";
    details.maskRequired = "No mask needed for general public. Recommended for severe respiratory patients.";
    details.outdoorTime = "Safe for outdoor activities.";
  } else if (currentAqi <= 150) {
    details.status = "Sensitive Groups Caution";
    details.precautions = "Sensitive individuals may experience irritation. Limit intense cardio, take frequent breaks. Keep windows closed.";
    details.maskRequired = "Surgical mask or N95 recommended if spending more than 2 hours outside.";
    details.outdoorTime = "Limit outdoor exposure to under 3 hours for children & elderly.";
  } else if (currentAqi <= 200) {
    details.status = "Unhealthy";
    details.precautions = "General public will start feeling chest tightness. Suspend outdoor jogs and replace with indoor exercises. Turn on HEPA Air Purifiers.";
    details.maskRequired = "N95/N99 respirators are highly recommended for any outdoor activity.";
    details.outdoorTime = "Avoid outdoor activities for sensitive groups. Limit to essential tasks for others.";
  } else {
    details.status = "Severe / Hazardous";
    details.precautions = "Extreme risk. Severe pulmonary strain. Seal all doors/windows. Run air purifiers on high. Do not perform any outdoor physical activities.";
    details.maskRequired = "Double mask or N95 mask is absolutely mandatory for outdoor transit.";
    details.outdoorTime = "Strictly stay indoors. Avoid outdoor air completely.";
  }

  // Personalize based on health profile
  if (profile.asthma || profile.copd || profile.bronchitis) {
    details.precautions = `[HIGH RISK ALERT: RESPIRATORY DIAGNOSIS] ${details.precautions} Ensure your bronchodilator is accessible. Avoid any temperature transitions (cold AC to hot outdoors) which trigger attacks.`;
  }
  if (profile.age === "child" || profile.age === "elderly") {
    details.precautions = `[VULNERABLE GROUP ADVISORY] ${details.precautions} Immune systems and lung capacities are vulnerable. Restrict school playground/morning walk exposures completely today.`;
  }

  return details;
};

// Presets for the AI Explainability Agent questions
export const getExplainabilityPreset = (question, simulationState, locationName = "Delhi") => {
  const { trafficReduction = 0, industrialReduction = 0 } = simulationState || {};
  
  if (question.includes("pm2.5") || question.includes("calculate")) {
    return `### Air Quality Index (AQI) Calculation Methodology

The overall Air Quality Index (AQI) is computed using the **Ind-AQI standard** (established by Central Pollution Control Board) which maps pollutant concentrations to sub-indices:

1. **Sub-Index Equations**: For each pollutant ($P_i$), a sub-index ($I_i$) is computed using piece-wise linear interpolation between breakpoints:
   $$I_i = \\frac{I_{high} - I_{low}}{BP_{high} - BP_{low}} \\cdot (C_i - BP_{low}) + I_{low}$$
   where $C_i$ is the concentration, and $BP$ represents the concentration breakpoints.
2. **Aggregated Index**: The final AQI is determined by the **maximum** of the sub-indices (the "dominant pollutant" principle):
   $$\\text{AQI} = \\max(I_{PM2.5}, I_{PM10}, I_{NO_2}, I_{SO_2}, I_{CO}, I_{O_3}, I_{NH_3})$$

Currently, for **${locationName}**, the dominant pollutant is **PM2.5** ($I_{PM2.5} \\approx 340$), which dictates the severe AQI score.

#### Simulation Effects applied:
- **Traffic emissions reduced by ${trafficReduction}%**: Reduces localized PM2.5 concentrations by approximately $0.32 \\times ${trafficReduction}\\%$.
- **Industrial emissions reduced by ${industrialReduction}%**: Reduces SO2 & PM10 concentrations.`;
  }

  if (question.includes("what-if") || question.includes("simulate") || question.includes("reduce")) {
    const netAqiDecrease = Math.round((trafficReduction * 0.8) + (industrialReduction * 0.5));
    return `### "What-If" Simulation Results for ${locationName}

By enforcing the simulated emission caps, we predict the following changes in the local microclimate:

*   **Traffic Reduction (${trafficReduction}%):** Projected to lower localized Nitrogen Dioxide ($NO_2$) by ${Math.round(trafficReduction * 0.7)}% and primary fine particulate ($PM2.5$) emissions by ${Math.round(trafficReduction * 0.4)}%.
*   **Industrial Caps (${industrialReduction}%):** Projected to reduce Sulfur Dioxide ($SO_2$) by ${Math.round(industrialReduction * 0.85)}% and ambient course dust ($PM10$) by ${Math.round(industrialReduction * 0.3)}%.

#### Final Evaluation:
*   **Aerosol Concentration Drop:** Estimated PM2.5 levels will fall from the baseline of **295.4 $\\mu$g/m³** down to **${(295.4 * (1 - (trafficReduction * 0.003 + industrialReduction * 0.0015))).toFixed(1)} $\\mu$g/m³**.
*   **Target AQI Change:** The overall index will decrease by **-${netAqiDecrease} AQI points**, yielding an adjusted AQI of **${Math.max(45, 342 - netAqiDecrease)}**.
*   **Category Shift:** The classification is predicted to improve from **Severe** to **${getAqiCategory(342 - netAqiDecrease).label}**.`;
  }

  // Default reply
  return `### AI Diagnostics Analysis

For **${locationName}**, the primary driver of ambient pollution is **Traffic Congestion** combined with **Construction Dust**. 

*   **Stagnant Meteorological Conditions:** The wind speed is currently very low (${mockLocations.find(l => l.name.includes(locationName))?.weather.wind_speed || 8} km/h), creating an inversion layer that locks particles near ground level.
*   **Mitigation Strategy:** Reducing traffic density by even 25% through high-occupancy restrictions along Anand Vihar lanes would reduce localized PM2.5 by roughly 20 $\\mu$g/m³ within 4 hours. Suppressing soil dust via active water sprinkling is highly recommended.`;
};
