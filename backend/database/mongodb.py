"""
MongoDB Connection Manager

Creates a single reusable connection to
MongoDB Atlas.
"""

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

from backend.config.settings import settings


class MongoDB:

    def __init__(self):

        self.client = None
        self.database = None

    def connect(self):

        """
        Connect to MongoDB Atlas.
        """

        try:

            self.client = MongoClient(
                settings.MONGODB_URI
            )

            # Test connection
            self.client.sumedhatatti81_db_user.command("ping")

            self.database = self.client[
                "urban_air_quality"
            ]

            print("✅ Connected to MongoDB Atlas.")

        except ConnectionFailure as error:

            print(
                f"❌ MongoDB Connection Failed:\n{error}"
            )

            raise error

    def disconnect(self):

        """
        Close MongoDB connection.
        """

        if self.client:

            self.client.close()

            print(
                "MongoDB connection closed."
            )


mongodb = MongoDB()