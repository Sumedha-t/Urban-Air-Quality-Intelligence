"""
Collect current weather
data from OpenWeather.
"""

from backend.config.settings import settings
from backend.utils.http_client import get_json
from backend.database.mongodb import mongodb
from backend.repositories.weather_repository import weather_repository

BASE_URL = "https://api.openweathermap.org/data/2.5/weather"


def get_weather(latitude: float, longitude: float):
    """
    Fetch current weather data.
    """

    params = {
        "lat": latitude,
        "lon": longitude,
        "appid": settings.OPENWEATHER_API_KEY,
        "units": "metric"
    }

    data = get_json(BASE_URL, params)

    if data is None:
        return None

    weather_data = {
        "source": "OpenWeather",
        "latitude": latitude,
        "longitude": longitude,
        "temperature": data["main"]["temp"],
        "feels_like": data["main"]["feels_like"],
        "humidity": data["main"]["humidity"],
        "pressure": data["main"]["pressure"],
        "wind_speed": data["wind"]["speed"],
        "wind_direction": data["wind"].get("deg"),
        "cloud_cover": data["clouds"]["all"],
        "rain": data.get("rain", {}).get("1h", 0),
        "weather": data["weather"][0]["main"],
        "description": data["weather"][0]["description"],
        "timestamp": data["dt"]
    }

    if mongodb.database is None:
        mongodb.connect()

    weather_repository.save(weather_data)

    return weather_data


if __name__ == "__main__":

    mongodb.connect()

    try:

        weather = get_weather(
            latitude=12.9716,
            longitude=77.5946
        )

        print(weather)

    finally:

        mongodb.disconnect()