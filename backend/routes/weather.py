from fastapi import APIRouter

from backend.data_collectors.weather import get_weather

router = APIRouter()

@router.get("/weather", tags=["Weather"])
def weather(latitude: float, longitude: float):
    return get_weather(latitude, longitude)