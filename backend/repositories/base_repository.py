"""
Base Repository

Provides common MongoDB operations for all repositories.
"""

from datetime import datetime

from backend.database.mongodb import mongodb


class BaseRepository:
    """
    Base class for all repositories.
    """

    COLLECTION_NAME = None

    @property
    def collection(self):
        return mongodb.database[self.COLLECTION_NAME]

    def save(self, data: dict):
        """
        Save a document.
        """

        document = data.copy()

        document["stored_at"] = datetime.utcnow()

        result = self.collection.insert_one(document)

        return result.inserted_id

    def get_latest(self):
        """
        Return the newest document.
        """

        return self.collection.find_one(
            sort=[("stored_at", -1)]
        )

    def get_recent(self, limit=10):
        """
        Return the latest N documents.
        """

        return list(
            self.collection.find()
            .sort("stored_at", -1)
            .limit(limit)
        )

    def get_all(self):
        """
        Return every document.
        """

        return list(
            self.collection.find()
        )

    def delete_all(self):
        """
        Delete every document.

        Useful during development/testing.
        """

        return self.collection.delete_many({})