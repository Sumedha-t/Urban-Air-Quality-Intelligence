"""
Main entry point for the Urban Air Quality Intelligence Platform API.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI

from backend.database.mongodb import mongodb

from backend.routes.home import router as home_router
from backend.routes.health import router as health_router
from backend.routes.aqi import router as aqi_router
from backend.routes.weather import router as weather_router
from backend.routes.traffic import router as traffic_router
from backend.routes.fusion import router as fusion_router
from backend.routes.history import router as history_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manage application startup and shutdown.
    """

    # Startup
    mongodb.connect()

    yield

    # Shutdown
    mongodb.disconnect()


app = FastAPI(
    title="Urban Air Quality Intelligence Platform",
    description="Backend API for Urban Air Quality Intelligence Platform",
    version="1.0.0",
    lifespan=lifespan,
)

# Register routes
app.include_router(home_router)
app.include_router(health_router)
app.include_router(aqi_router)
app.include_router(weather_router)
app.include_router(traffic_router)
app.include_router(fusion_router)
app.include_router(history_router)