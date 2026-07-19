from fastapi import APIRouter

router = APIRouter()

@router.get("/health", tags=["Health"])
def health():
    return {
        "status": "healthy",
        "service": "Urban Air Quality Intelligence Platform"
    }