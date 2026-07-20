"""
Repository for fused environmental snapshots.
"""

from backend.repositories.base_repository import BaseRepository


class FusionRepository(BaseRepository):

    COLLECTION_NAME = "fusion_history"


fusion_repository = FusionRepository()