"""
Repository for Zone Snapshot data.
"""

from backend.repositories.base_repository import BaseRepository


class ZoneRepository(BaseRepository):

    COLLECTION_NAME = "zone_snapshots"


zone_repository = ZoneRepository()