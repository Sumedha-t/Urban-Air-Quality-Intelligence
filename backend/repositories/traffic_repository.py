"""
Repository for Traffic data.
"""

from backend.repositories.base_repository import BaseRepository


class TrafficRepository(BaseRepository):

    COLLECTION_NAME = "traffic_history"


traffic_repository = TrafficRepository()