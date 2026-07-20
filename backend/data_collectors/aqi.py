"""
Collect Air Quality Index (AQI)
data from OpenWeather.
"""

from backend.config.settings import settings
from backend.utils.http_client import get_json
from backend.database.mongodb import mongodb
from backend.repositories.aqi_repository import aqi_repository

BASE_URL = "https://api.openweathermap.org/data/2.5/air_pollution"


def get_air_quality(latitude: float, longitude: float):
    """
    Fetch AQI and pollutant concentrations.
    """

    params = {
        "lat": latitude,
        "lon": longitude,
        "appid": settings.OPENWEATHER_API_KEY
    }

    data = get_json(BASE_URL, params)

    if data is None:
        return None

    result = data["list"][0]

    aqi_data = {
        "source": "OpenWeather",
        "latitude": latitude,
        "longitude": longitude,
        "aqi": result["main"]["aqi"],
        "pollutants": result["components"],
        "timestamp": result["dt"]
    }

    # Connect to MongoDB if not already connected
    if mongodb.database is None:
        mongodb.connect()

    # Save AQI data to MongoDB
    aqi_repository.save(aqi_data)

    return aqi_data


if __name__ == "__main__":

    # Open one database connection
    mongodb.connect()

    try:
        aqi = get_air_quality(
            latitude=12.9716,
            longitude=77.5946
        )

        print(aqi)

    finally:
        # Always close the connection
        mongodb.disconnect()