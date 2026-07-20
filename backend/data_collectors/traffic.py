"""
Collect real-time traffic information
using the TomTom Traffic Flow API.
"""

from backend.config.settings import settings
from backend.utils.http_client import get_json
from backend.database.mongodb import mongodb
from backend.repositories.traffic_repository import traffic_repository

BASE_URL = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json"


def get_traffic(latitude: float, longitude: float):
    """
    Fetch traffic information for a location.
    """

    params = {
        "key": settings.TOMTOM_API_KEY,
        "point": f"{latitude},{longitude}"
    }

    data = get_json(BASE_URL, params)

    if data is None:
        return None

    flow = data["flowSegmentData"]

    traffic_data = {
        "source": "TomTom",
        "latitude": latitude,
        "longitude": longitude,
        "current_speed": flow["currentSpeed"],
        "free_flow_speed": flow["freeFlowSpeed"],
        "current_travel_time": flow["currentTravelTime"],
        "free_flow_travel_time": flow["freeFlowTravelTime"],
        "confidence": flow["confidence"],
        "road_closure": flow["roadClosure"],
        "frc": flow["frc"],
        "timestamp": flow["coordinates"]["coordinate"][0]
    }

    if mongodb.database is None:
        mongodb.connect()

    traffic_repository.save(traffic_data)

    return traffic_data


if __name__ == "__main__":

    mongodb.connect()

    try:

        traffic = get_traffic(
            latitude=12.9716,
            longitude=77.5946
        )

        print(traffic)

    finally:

        mongodb.disconnect()