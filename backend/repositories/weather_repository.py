"""
Repository for Weather data.
"""

from backend.repositories.base_repository import BaseRepository


class WeatherRepository(BaseRepository):

    COLLECTION_NAME = "weather_history"


weather_repository = WeatherRepository()