from fastapi import APIRouter, HTTPException

from backend.repositories.aqi_repository import aqi_repository
from backend.repositories.weather_repository import weather_repository
from backend.services.forecast_service import forecast_service

router = APIRouter()


@router.get("/forecast/latest", tags=["Forecast"])
def latest_forecast():

    aqi = aqi_repository.get_latest()
    weather = weather_repository.get_latest()

    if not aqi:
        raise HTTPException(
            status_code=404,
            detail="No AQI history found."
        )

    if not weather:
        raise HTTPException(
            status_code=404,
            detail="No Weather history found."
        )

    return forecast_service.predict(
        aqi_data=aqi,
        weather_data=weather,
        station="Bangalore"
    )