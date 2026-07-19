from fastapi import APIRouter

from backend.data_collectors.traffic import get_traffic

router = APIRouter()

@router.get("/traffic", tags=["Traffic"])
def traffic(latitude: float, longitude: float):
    return get_traffic(latitude, longitude)