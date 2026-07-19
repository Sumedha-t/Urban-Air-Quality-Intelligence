from fastapi import FastAPI

from backend.routes.home import router as home_router
from backend.routes.health import router as health_router

app = FastAPI(
    title="Urban Air Quality Intelligence Platform",
    description="Backend API for Urban Air Quality Intelligence Platform",
    version="1.0.0"
)

app.include_router(home_router)
app.include_router(health_router)
from backend.routes.aqi import router as aqi_router
app.include_router(aqi_router)
from backend.routes.weather import router as weather_router
app.include_router(weather_router)
from backend.routes.traffic import router as traffic_router
app.include_router(traffic_router)
from backend.routes.fusion import router as fusion_router
app.include_router(fusion_router)