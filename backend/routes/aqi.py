from fastapi import APIRouter

from backend.data_collectors.aqi import get_air_quality

router = APIRouter()

@router.get("/aqi", tags=["AQI"])
def aqi(latitude: float, longitude: float):
    return get_air_quality(latitude, longitude)