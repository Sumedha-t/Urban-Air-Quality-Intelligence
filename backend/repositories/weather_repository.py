"""
Repository for Weather data.
"""

from datetime import datetime

from backend.database.mongodb import mongodb


class WeatherRepository:

    COLLECTION_NAME = "weather_history"

    @property
    def collection(self):
        return mongodb.database[self.COLLECTION_NAME]

    def save(self, weather_data: dict):

        document = weather_data.copy()

        document["stored_at"] = datetime.utcnow()

        result = self.collection.insert_one(document)

        return result.inserted_id


weather_repository = WeatherRepository()