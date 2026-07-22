# 🌍 Urban Air Quality Intelligence Platform

> **An AI-powered Decision Support Platform for Urban Air Quality Monitoring, Source Attribution, Forecasting, and Intelligent Intervention Planning.**

---

# 📌 Problem Statement

Urban air pollution is a growing concern influenced by multiple dynamic factors including traffic congestion, weather conditions, industrial emissions, construction activities, and citizen-reported incidents. Existing monitoring systems primarily display AQI values but provide limited support for understanding pollution causes or recommending actionable interventions.

The **Urban Air Quality Intelligence Platform** integrates multiple environmental data sources into a unified AI-driven intelligence pipeline to assist municipal authorities in monitoring, forecasting, and mitigating urban air pollution.

---

# 🎯 Objectives

- Monitor real-time air quality
- Integrate multiple heterogeneous environmental data sources
- Identify probable pollution contributors
- Forecast future AQI
- Recommend intelligent interventions
- Enable citizen participation
- Support data-driven urban governance

---
---

# ✨ Features

- Real-time Air Quality Monitoring
- Weather Data Integration
- Traffic Flow Monitoring
- Environmental Data Fusion
- Historical Data Storage
- RESTful API Services
- Modular Backend Architecture
- Scalable AI Pipeline
- Decision Support Framework

# 🏗 Overall System Architecture

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                     URBAN AIR QUALITY INTELLIGENCE PLATFORM                  │
└──────────────────────────────────────────────────────────────────────────────┘

                   ┌────────────────────────────────────┐
                   │       External Data Sources        │
                   └────────────────────────────────────┘
                                      │
      ┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
      │              │              │              │              │
      ▼              ▼              ▼              ▼              ▼
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌────────────┐  ┌─────────────┐
│ AQI API  │   │ Weather  │   │ Traffic  │   │ Satellite  │  │ Citizen     │
│          │   │ API      │   │ API      │   │ Data       │  │ Reports     │
└──────────┘   └──────────┘   └──────────┘   └────────────┘  └─────────────┘
      │              │              │              │              │
      └──────────────┴──────────────┴──────────────┴──────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────┐
                    │      Data Collection Layer       │
                    └──────────────────────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────┐
                    │        Data Fusion Agent         │
                    └──────────────────────────────────┘
                                      │
                                      ▼
                  ┌─────────────────────────────────────────┐
                  │ Standardized Environmental Snapshot     │
                  └─────────────────────────────────────────┘
                                      │
             ┌────────────────────────┼────────────────────────┐
             ▼                        ▼                        ▼
┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐
│ Source Attribution │    │ AQI Forecast Agent │    │ Decision Support   │
│ Agent              │    │                    │    │ Agent              │
└────────────────────┘    └────────────────────┘    └────────────────────┘
             └────────────────────────┼────────────────────────┘
                                      ▼
                    ┌──────────────────────────────────┐
                    │     Administrator Dashboard      │
                    └──────────────────────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────┐
                    │      Citizen Information Portal  │
                    └──────────────────────────────────┘
```

---

# 📂 Project Structure

```text
Urban-Air-Quality-Intelligence/
│
├── backend/
│   ├── agents/
│   │   └── data_fusion.py
│   ├── config/
│   ├── data_collectors/
│   │   ├── aqi.py
│   │   ├── weather.py
│   │   └── traffic.py
│   ├── database/
│   ├── repositories/
│   ├── routes/
│   ├── utils/
│   ├── __init__.py
│   └── main.py
│
├── docs/
│   ├── API.md
│   ├── Architecture.md
│   └── Technology_Stack.md
│
├── .gitignore
├── README.md
└── requirements.txt
```

# 📚 Documentation

Detailed documentation is available inside the **docs/** directory.

- API Documentation
- System Architecture
- Technology Stack
- Problem Statement
- Literature Survey

# 🔄 Backend Data Flow

```text
AQI Collector
        │
Weather Collector
        │
Traffic Collector
        │
Satellite Collector
        │
Citizen Reports
        │
        ▼
 Data Fusion Agent
        │
        ▼
Unified Environmental Snapshot
        │
        ▼
 FastAPI Backend
        │
        ▼
 React Dashboard
```

---

# 🤖 Multi-Agent Architecture

```text
                    USER REQUEST
                          │
                          ▼
                 Data Fusion Agent
                          │
      ┌───────────────────┼────────────────────┐
      ▼                   ▼                    ▼
Source Attribution   Forecast Agent    Decision Agent
      │                   │                    │
      └───────────────────┼────────────────────┘
                          ▼
              Recommended Action Plan
                          │
                          ▼
                 Administrator Dashboard
                          │
                          ▼
                 Citizen Notification
```

---

# 🔄 Data Fusion Workflow

```text
AQI API
      │
Weather API
      │
Traffic API
      │
Satellite API
      │
Citizen Reports
      │
      ▼
 Validate Inputs
      │
      ▼
 Handle Missing Sources
      │
      ▼
 Compute Confidence
      │
      ▼
 Merge Data
      │
      ▼
 Standard Environmental Snapshot
```

---

# 🧠 AI Decision Pipeline

```text
Environmental Snapshot
          │
          ▼
Source Attribution
          │
          ▼
AQI Prediction
          │
          ▼
Decision Support
          │
          ▼
Recommended Actions
          │
          ▼
Administrator
          │
          ▼
Citizen Advisory
```

---

# 🖥 Administrator Dashboard

```text
                 Administrator Dashboard

┌────────────────────────────────────────────────────────────┐
│ Live AQI Map                                               │
├────────────────────────────────────────────────────────────┤
│ Pollution Hotspots                                         │
├────────────────────────────────────────────────────────────┤
│ Source Contribution                                        │
├────────────────────────────────────────────────────────────┤
│ AQI Forecast                                               │
├────────────────────────────────────────────────────────────┤
│ Recommended Actions                                        │
├────────────────────────────────────────────────────────────┤
│ Citizen Complaints                                         │
├────────────────────────────────────────────────────────────┤
│ Published Advisories                                       │
└────────────────────────────────────────────────────────────┘
```

---

# 📱 Citizen Portal

```text
                Citizen Portal

┌──────────────────────────────┐
│ Current AQI                  │
├──────────────────────────────┤
│ Health Advisory              │
├──────────────────────────────┤
│ Submit Complaint             │
├──────────────────────────────┤
│ Suggestions                  │
├──────────────────────────────┤
│ Vote on Proposed Actions     │
├──────────────────────────────┤
│ Advisory History             │
└──────────────────────────────┘
```

---

# 🌐 Data Sources

## ✅ Implemented

- OpenWeather Air Pollution API
- OpenWeather Weather API
- TomTom Traffic API

## 🚧 Planned

- Satellite Environmental Data
- CPCB Monitoring Stations
- Citizen Reports

---

# 🛠 Technology Stack

### Backend

- ### Backend

- Python
- FastAPI

### Frontend

- React.js *(Upcoming)*

### Database

- MongoDB

### AI / Machine Learning

- Python
- Scikit-learn
- TensorFlow / PyTorch

### APIs

- OpenWeather
- TomTom
- CPCB *(Upcoming)*
- Satellite APIs *(Upcoming)*

---

# ✅ Current Progress

- [x] Project Setup
- [x] Git Repository
- [x] Virtual Environment
- [x] Configuration Management
- [x] Shared HTTP Client
- [x] AQI Collector
- [x] Weather Collector
- [x] Traffic Collector
- [x] MongoDB Integration
- [x] REST API Routes
- [x] History APIs
- [x] API Documentation
- [x] System Architecture Documentation

---

# 🚀 Upcoming Milestones

- [ ] Citizen Reports
- [ ] Satellite Collector
- [ ] CPCB Collector
- [ ] Source Attribution Agent
- [ ] AQI Forecast Agent
- [ ] Decision Support Agent
- [ ] React Dashboard
- [ ] Deployment

---

# 👥 Team

| Name | Responsibility |
|------|----------------|
| Sumedha Tatti | Backend Development, AI Pipeline, System Architecture |
| Pratyusha C S| Frontend Development |
| Aditi Anil Kulkarni | Documentation & Presentation ,API Documentation|

---

# 📄 License

Developed as part of an AI Hackathon for educational and research purposes.

---

## ⭐ Development Status

**Phase 2 Complete**

✔ Real-time AQI Collector

✔ Weather Collector

✔ Traffic Collector

✔ Data Fusion Agent

The backend now generates a standardized environmental snapshot that serves as the foundation for the upcoming AI agents, REST APIs, dashboard, and decision support system.