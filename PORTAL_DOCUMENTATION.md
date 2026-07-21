# Portal Technical Documentation

This document describes the development process, structural architecture, datasets used, and integration guidelines for the **Urban Air Quality Intelligence Platform** full-stack frontend portal.

---

## 🛠️ Technology Stack

1.  **Frontend Core Framework**: React 19 + Vite (leveraging fast Hot Module Replacement).
2.  **Styling & Design System**: **Tailwind CSS v4** (utilizing the `@tailwindcss/vite` compiler plugin for rapid styling). Custom colors, transitions, and map styles are configured in `src/index.css`.
3.  **Geospatial Layouts**: **Leaflet** & **React Leaflet 5** (used to compile interactive vector GIS overlays).
4.  **Data Visualizations**: **Recharts** (used to assemble responsive historical trendlines, emission source allocations, and climate composé graphs).
5.  **Icons Library**: **React Icons** (Feather Icons category `Fi...`).
6.  **Routing & Contexts**: **React Router DOM 7** (using `HashRouter` to support local file previews and static web environments cleanly).

---

## 🌟 Refined UI Adjustments Implemented

*   **Custom Wave Logo (Image 5)**: Embedded a clean vector SVG logo containing three swooping air-flow currents in the `Header` component.
*   **Numerical DivIcon Markers (Image 3)**: Programmed Leaflet to bypass traditional markers and render circular badges displaying the AQI number as text, colored dynamically based on local hazard scales.
*   **Relative Zoom Heatmaps**: Programmed a zoom listener component. When zoomed out, the map shows city-level pins; when zoomed in past level 8, it displays a detailed sub-region node swarm (e.g. Bangalore displays Hoskote, Peenya, Bommasandra, Silk Board with distinct AQIs).
*   **Compact Weather Dashboard (Image 1)**: Swapped single cards for a grouped Current Conditions weather card displaying large temperature values, humidity, UV indexes, and wind speeds side-by-side.
*   **Dual-Colored Forecast Graphs**: Set up a continuous Recharts Area chart plotting the historical past 12h trends in **Blue** and future predicted 24h curves in **Gold**, ensuring easy scanning of environmental shifts.
*   **Mitigation Policy Creator**: Added an Admin dashboard controller to add custom policies (e.g. "Ban Diesel Generators") and define an AQI reduction drop. Checking a policy dynamically offsets future hourly forecast values on the chart in real-time.
*   **Region-Specific Prioritization**: Structured priority intervention lists to filter sub-regions based on the active city (e.g. ranking whitefield and Silk Board when Bangalore is focused).
*   **Announcements Ticker**: Relocated citizen safety warnings to the top of the dashboard as a narrow, horizontal announcements board.
*   **Influence Attributes Matrix**: Added a percentage widget in the citizen hub showing what factors (Traffic, Meteorological, Land Use, Industrial, Satellite Thermal Gradients) are driving the AQI.
*   **Climate Change Extremes Dashboard (Image 4)**: Coded a composed historical graph tracking precipitation, humidity, UV, wind, and PM2.5 from 2010 to 2026, alongside cards detailing Hottest/Coldest years and record-breaking weather months.
*   **AI Health Counselor & Emergency Alert Dial**: Created an AI health profile counselor detailing precautions for time-specific slots (morning walks vs evening transits) and a distress button that mocks dispatching emergency alerts to contacts via SMS.

---

## 📊 Dataset Structure & Mock Database

The portal utilizes structured datasets inside `src/services/mockData.js` representing actual CPCB feeds. Key tables include:

### 1. Station Hierarchical Records
```javascript
{
  id: "bengaluru",
  name: "Bengaluru Urban",
  state: "Karnataka",
  lat: 12.9716,
  lon: 77.5946,
  aqi: 72,
  pollutants: { pm2_5: 22.8, pm10: 54.2, no2: 32.9, ... },
  subRegions: [
    { name: "Silk Board Junction", lat: 12.9176, lon: 77.6244, aqi: 90 },
    { name: "Bommasandra Industrial", lat: 12.8185, lon: 77.6791, aqi: 105 },
    ...
  ]
}
```

### 2. 17-Year Climate Change Records (2010 - 2026)
Tracks average values per year:
*   `year`: 2010 to 2026
*   `temperature` (°C)
*   `humidity` (%)
*   `precipitation` (Rainfall in mm)
*   `windSpeed` (km/h)
*   `uv` (Index score)
*   `aqi` (Index score)

---

## 🔌 Connecting to the FastAPI Backend

The client layer is fully abstract and configured in `src/services/api.js`. Initially, the portal intercepts requests to simulate latency and retrieve mock values:

```javascript
const USE_MOCK = true; // Toggle to false to connect to FastAPI
```

When integrating the backend:
1.  Set `USE_MOCK = false` inside `src/services/api.js`.
2.  Define your FastAPI endpoint URL as `VITE_API_URL` in the frontend `.env` file:
    ```env
    VITE_API_URL=http://localhost:8000/api
    ```
3.  Ensure your FastAPI endpoints in `backend/routes/` support the query schemas:
    *   `/api/locations` (returns city centers)
    *   `/api/fusion?latitude=x&longitude=y` (returns fused coordinates statistics)
    *   `/api/aqi/forecast/hourly?location_id=x` (returns combined hourly forecasts)
    *   `/api/citizen/climate?location_id=x` (returns 17-year historical arrays)
