from fastapi import APIRouter

router = APIRouter()

@router.get("/", tags=["Home"])
def home():
    return {
        "message": "Urban Air Quality Intelligence Platform API",
        "status": "Running"
    }