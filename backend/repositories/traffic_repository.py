"""
Repository for Traffic data.
"""

from datetime import datetime

from backend.database.mongodb import mongodb


class TrafficRepository:

    COLLECTION_NAME = "traffic_history"

    @property
    def collection(self):
        return mongodb.database[self.COLLECTION_NAME]

    def save(self, traffic_data: dict):

        document = traffic_data.copy()

        document["stored_at"] = datetime.utcnow()

        result = self.collection.insert_one(document)

        return result.inserted_id


traffic_repository = TrafficRepository()