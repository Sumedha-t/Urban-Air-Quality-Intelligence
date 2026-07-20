"""
Repository for AQI data.
"""

from backend.repositories.base_repository import BaseRepository


class AQIRepository(BaseRepository):

    COLLECTION_NAME = "aqi_history"


aqi_repository = AQIRepository()