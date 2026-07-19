"""
Collect Air Quality Index (AQI)
data from OpenWeather.
"""

from backend.config.settings import settings
from backend.utils.http_client import get_json

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

    return {
        "source": "OpenWeather",
        "latitude": latitude,
        "longitude": longitude,
        "aqi": result["main"]["aqi"],
        "pollutants": result["components"],
        "timestamp": result["dt"]
    }


if __name__ == "__main__":

    aqi = get_air_quality(
        latitude=12.9716,
        longitude=77.5946
    )

    print(aqi)