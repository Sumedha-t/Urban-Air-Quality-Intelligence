# Installation Guide

# Overview

This guide explains how to install, configure, and run the Urban Air Quality Intelligence Platform on a local machine. The project consists of a React frontend, FastAPI backend, MongoDB database, and external environmental APIs.

---

# System Requirements

| Software | Version |
|----------|---------|
| Python | 3.10+ |
| Node.js | 18+ |
| npm | Latest |
| MongoDB | Community Edition |
| Git | Latest |
| VS Code | Recommended |

---

# Project Components

The platform consists of:

- React Frontend
- FastAPI Backend
- MongoDB Database
- OpenWeather APIs
- TomTom Traffic API

---

# Clone the Repository

```bash
git clone <repository-url>
```

Navigate into the project.

```bash
cd Urban-Air-Quality-Intelligence
```

---

# Backend Installation

Navigate to the backend.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate it.

### Windows

```bash
venv\Scripts\activate
```

### Linux/macOS

```bash
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

---

# Frontend Installation

Navigate to the frontend.

```bash
cd frontend
```

Install packages.

```bash
npm install
```

---

# MongoDB Configuration

Install MongoDB Community Edition.

Ensure the MongoDB service is running.

Default connection:

```
mongodb://localhost:27017
```

---

# Environment Variables

Create a `.env` file in the backend directory.

Example:

```
OPENWEATHER_API_KEY=YOUR_API_KEY
TOMTOM_API_KEY=YOUR_API_KEY
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=urban_air_quality
```

---

# Running the Backend

Navigate to the backend.

```bash
cd backend
```

Run the application.

```bash
python main.py
```

or

```bash
uvicorn main:app --reload
```

---

# Running the Frontend

Navigate to the frontend.

```bash
cd frontend
```

Run the development server.

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

# API Documentation

Swagger UI

```
http://localhost:8000/docs
```

ReDoc

```
http://localhost:8000/redoc
```

---

# Verification

After both servers start successfully:

- Open the React application.
- Login as Administrator or Citizen.
- Verify AQI, Weather, and Traffic data are displayed.
- Ensure API responses are received successfully.

---

# Common Issues

## Python Modules Missing

```
pip install -r requirements.txt
```

---

## MongoDB Connection Error

- Verify MongoDB is running.
- Check connection string.
- Confirm database name.

---

## API Key Error

Verify:

- OpenWeather API key
- TomTom API key
- Environment variables

---

## Frontend Not Starting

Run:

```
npm install
```

again before:

```
npm run dev
```

---

# Installation Summary

1. Clone repository
2. Install backend dependencies
3. Install frontend dependencies
4. Configure MongoDB
5. Configure API keys
6. Start backend
7. Start frontend
8. Open the application

---

# Conclusion

After completing the above steps, the Urban Air Quality Intelligence Platform will be ready for development, testing, and demonstration.