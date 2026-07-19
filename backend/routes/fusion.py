from fastapi import APIRouter

from backend.agents.data_fusion import fuse_data

router = APIRouter()

@router.get("/fusion", tags=["Data Fusion"])
def fusion(latitude: float, longitude: float):
    return fuse_data(latitude, longitude)