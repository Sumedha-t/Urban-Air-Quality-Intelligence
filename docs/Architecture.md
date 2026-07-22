# System Architecture

## 1. Overview

The Urban Air Quality Intelligence Platform is a modular backend application developed using FastAPI. The system collects real-time environmental information from multiple external APIs, including weather, traffic, and air quality services. These datasets are processed, stored in MongoDB, and exposed through REST APIs for client applications.

The architecture follows a modular design where each component has a specific responsibility. Data collectors communicate with external services, repositories manage database operations, and API routes expose the processed information to users.

The system is designed to be scalable, maintainable, and easy to extend with additional environmental data sources in the future.
---

## 2. System Architecture

```text
                    User / Frontend
                           │
                           ▼
                  FastAPI REST APIs
                           │
      ┌────────────┬────────────┬────────────┐
      ▼            ▼            ▼
 Weather      Traffic        AQI
 Collector    Collector    Collector
(OpenWeather) (TomTom)   (AQI Provider)
      │            │            │
      └────────────┴────────────┘
                    │
                    ▼
              Data Fusion Agent
                    │
                    ▼
              MongoDB Database
                    │
                    ▼
          History API Endpoints
                    │
                    ▼
                 JSON Response
```

The architecture follows a layered and modular approach. Each data collector retrieves real-time environmental information from an external service, stores it in MongoDB through repository classes, and exposes it through FastAPI endpoints.
---

## 3. System Components

### 3.1 FastAPI Backend

The FastAPI backend acts as the central controller of the application. It receives HTTP requests, invokes the required data collectors or repositories, and returns JSON responses to the client.

### 3.2 Weather Collector

Retrieves real-time weather information from the OpenWeather API, including temperature, humidity, pressure, wind speed, cloud cover, and rainfall.

### 3.3 Traffic Collector

Retrieves real-time traffic flow information from the TomTom Traffic Flow API, including current speed, travel time, congestion level, and road status.

### 3.4 AQI Collector

Retrieves real-time air quality information from the configured AQI provider and stores the collected environmental data.

### 3.5 Data Fusion Agent

Combines weather, traffic, and AQI information into a unified environmental dataset for analysis.

### 3.6 MongoDB

Stores weather, traffic, AQI, and fused environmental records, enabling historical analysis and retrieval through History APIs.

---

## 4. System Workflow

The Urban Air Quality Intelligence Platform follows the workflow below:

1. The client sends a request to one of the FastAPI endpoints.
2. The corresponding route invokes the required data collector.
3. The data collector requests real-time environmental data from an external API.
4. The received data is validated and formatted into a standard structure.
5. The repository layer stores the processed data in MongoDB.
6. The processed information is returned to the client as a JSON response.
7. Historical records can be retrieved through the History API endpoints.

---

## 5. Data Flow

The following sequence illustrates how information flows through the system:

```
User Request
      │
      ▼
FastAPI Route
      │
      ▼
Data Collector
      │
      ▼
External API
      │
      ▼
Processed Data
      │
      ▼
MongoDB Database
      │
      ▼
JSON Response
```

The application separates data collection, storage, and API services, making the system modular and easy to maintain.
---

## 6. Database Layer

MongoDB is used as the primary database for storing environmental information.

Separate collections are maintained for:

- Weather Data
- Traffic Data
- AQI Data
- Fused Environmental Data

This design enables efficient retrieval of historical records while keeping each dataset independent.
---

## 7. Technology Stack

| Component | Technology |
|-----------|------------|
| Programming Language | Python |
| Backend Framework | FastAPI |
| Database | MongoDB |
| Weather Service | OpenWeather API |
| Traffic Service | TomTom Traffic Flow API |
| REST API | FastAPI |
| Version Control | Git & GitHub |
| IDE | Visual Studio Code |

---

## 8. Advantages of the Architecture

- Modular and easy to maintain.
- Separation of concerns using collectors, repositories, and routes.
- Easy integration of additional environmental data sources.
- Supports historical data storage and retrieval.
- RESTful API architecture for interoperability.
- Scalable backend suitable for future enhancements.
- MongoDB enables flexible storage of heterogeneous environmental datasets.