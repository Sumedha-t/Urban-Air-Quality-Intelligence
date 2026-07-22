# Developer Guide

# Overview

This guide is intended for developers contributing to the Urban Air Quality Intelligence Platform (UAQIP). It explains the project structure, development workflow, coding conventions, backend and frontend organization, and guidelines for extending the platform.

---

# Project Architecture

The application follows a modular full-stack architecture consisting of:

- React Frontend
- FastAPI Backend
- MongoDB Database
- External Environmental APIs

The separation between frontend and backend allows independent development, testing, and deployment.

---

# Project Directory Structure

```text
Urban-Air-Quality-Intelligence/
│
├── backend/
│   ├── agents/
│   ├── config/
│   ├── data_collectors/
│   ├── database/
│   ├── repositories/
│   ├── routes/
│   ├── utils/
│   └── main.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── docs/
│
├── README.md
└── PORTAL_DOCUMENTATION.md
```

---

# Backend Structure

The backend is implemented using FastAPI.

## agents/

Contains modules responsible for environmental data processing and future AI integrations.

## config/

Stores configuration files, constants, and application settings.

## data_collectors/

Responsible for collecting environmental data from external APIs.

Examples:

- AQI Collector
- Weather Collector
- Traffic Collector

## database/

Handles MongoDB connections and database initialization.

## repositories/

Implements database operations using the repository pattern.

## routes/

Defines REST API endpoints exposed to the frontend.

## utils/

Contains reusable helper functions used throughout the backend.

## main.py

Application entry point.

---

# Frontend Structure

The frontend is developed using React and Vite.

## assets/

Stores images, icons, and static resources.

## components/

Reusable UI components such as:

- Charts
- Maps
- Layout Components
- Common Components

## pages/

Contains application pages.

Examples:

- Administrator Portal
- Citizen Portal
- Login Page

## services/

Handles communication with backend REST APIs.

## App.jsx

Root React component.

## main.jsx

Frontend application entry point.

---

# Database

MongoDB stores both current and historical environmental data.

Typical collections include:

- AQI Data
- Weather Data
- Traffic Data
- Fusion Data

---

# REST APIs

The frontend communicates with the backend using REST APIs.

### Current Endpoints

```
GET /
GET /health

GET /aqi
GET /weather
GET /traffic
GET /fusion

GET /history/aqi
GET /history/aqi/latest

GET /history/weather
GET /history/weather/latest

GET /history/traffic
GET /history/traffic/latest

GET /history/fusion
GET /history/fusion/latest
```

---

# Development Workflow

A typical development workflow is:

1. Pull the latest changes.
2. Create or switch to a feature branch.
3. Implement the feature.
4. Test the functionality.
5. Commit changes.
6. Push to GitHub.
7. Create a Pull Request.

---

# Adding a New Backend API

To add a new API endpoint:

1. Create the required logic.
2. Add a new route in the `routes` directory.
3. Update repository functions if database access is needed.
4. Test using Swagger or Postman.
5. Connect the frontend service.

---

# Adding a New Frontend Page

1. Create a new component in `pages/`.
2. Add reusable UI elements in `components/` if required.
3. Connect the page to backend APIs through `services/`.
4. Register the page in the routing configuration.

---

# Coding Guidelines

Developers should follow these practices:

- Use meaningful variable names.
- Write modular functions.
- Keep components reusable.
- Avoid duplicate code.
- Add comments where necessary.
- Follow consistent formatting.

---

# Error Handling

The application should:

- Validate user input.
- Handle API failures gracefully.
- Return meaningful HTTP status codes.
- Display user-friendly error messages.

---

# Testing

Before committing changes:

- Verify backend APIs.
- Check frontend rendering.
- Validate MongoDB connectivity.
- Ensure API responses are correct.
- Test the application in different browsers.

---

# Documentation

Whenever new functionality is added:

- Update README.md
- Update API.md
- Update Architecture.md if the architecture changes
- Update Technology_Stack.md if new technologies are introduced

---

# Future Development

Developers may extend the platform by adding:

- AQI Forecasting Models
- Explainable AI (XAI)
- Pollution Source Attribution Models
- IoT Sensor Integration
- Satellite Data Integration
- Notification System
- Mobile Application
- Cloud Deployment

---

# Best Practices

- Keep modules independent.
- Maintain separation of concerns.
- Follow RESTful API design.
- Write reusable React components.
- Use environment variables for sensitive configuration.
- Document new features.

---

# Conclusion

The modular architecture of the Urban Air Quality Intelligence Platform enables developers to extend and maintain the system efficiently. By following the guidelines in this document, contributors can ensure consistency, scalability, and maintainability as the project evolves.