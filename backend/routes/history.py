"""
History API Routes

Provides access to historical environmental data.
"""

from fastapi import APIRouter

from backend.repositories.aqi_repository import aqi_repository
from backend.repositories.weather_repository import weather_repository
from backend.repositories.traffic_repository import traffic_repository
from backend.repositories.fusion_repository import fusion_repository
from backend.utils.mongo_serializer import (
    serialize_document,
    serialize_documents,
)

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


# ---------------- AQI ---------------- #

@router.get("/aqi")
def get_aqi_history():

    return serialize_documents(
    aqi_repository.get_recent(100)
)


@router.get("/aqi/latest")
def get_latest_aqi():

    return serialize_document(
    aqi_repository.get_latest()
)


# ---------------- Weather ---------------- #

@router.get("/weather")
def get_weather_history():

    return serialize_documents(
    weather_repository.get_recent(100)
)


@router.get("/weather/latest")
def get_latest_weather():

   return serialize_document(
    weather_repository.get_latest()
)


# ---------------- Traffic ---------------- #

@router.get("/traffic")
def get_traffic_history():

   return serialize_documents(
    traffic_repository.get_recent(100)
)


@router.get("/traffic/latest")
def get_latest_traffic():

    return serialize_document(
    traffic_repository.get_latest()
)


# ---------------- Fusion ---------------- #

@router.get("/fusion")
def get_fusion_history():

    return serialize_documents(
    fusion_repository.get_recent(100)
)


@router.get("/fusion/latest")
def get_latest_fusion():

    return serialize_document(
    fusion_repository.get_latest()
)