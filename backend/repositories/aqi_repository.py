"""
Repository for AQI data.
"""

from datetime import datetime

from backend.database.mongodb import mongodb


class AQIRepository:

    COLLECTION_NAME = "aqi_history"

    @property
    def collection(self):
        return mongodb.database[self.COLLECTION_NAME]

    def save(self, aqi_data: dict):

        document = aqi_data.copy()

        document["stored_at"] = datetime.utcnow()

        result = self.collection.insert_one(document)

        return result.inserted_id


aqi_repository = AQIRepository()