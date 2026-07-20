"""
Data Fusion Agent

Combines data from all collectors into a
single standardized environmental snapshot.
"""

from datetime import datetime
from pprint import pprint

from backend.database.mongodb import mongodb
from backend.repositories.fusion_repository import fusion_repository

from backend.data_collectors.aqi import get_air_quality
from backend.data_collectors.weather import get_weather
from backend.data_collectors.traffic import get_traffic


def fuse_data(latitude: float, longitude: float):
    """
    Collect and combine data from all sources.
    """

    collectors = {
        "aqi": get_air_quality,
        "weather": get_weather,
        "traffic": get_traffic,
    }

    sources = {}
    missing_sources = []
    warnings = []

    successful = 0

    for name, collector in collectors.items():

        try:

            result = collector(latitude, longitude)

            if result is None:

                missing_sources.append(name)
                warnings.append(
                    f"{name} collector returned no data."
                )

            else:

                sources[name] = result
                successful += 1

        except Exception as error:

            missing_sources.append(name)

            warnings.append(
                f"{name}: {error}"
            )

    confidence = successful / len(collectors)

    status = "SUCCESS"

    if successful == 0:

        status = "FAILED"

    elif successful < len(collectors):

        status = "PARTIAL_SUCCESS"

    fused = {

        "status": status,

        "collection_time": datetime.utcnow().isoformat() + "Z",

        "location": {
            "latitude": latitude,
            "longitude": longitude
        },

        "confidence": round(confidence, 2),

        "sources": sources,

        "missing_sources": missing_sources,

        "warnings": warnings

    }

    # Connect only once if needed
    if mongodb.database is None:
        mongodb.connect()

    # Save fused snapshot
    fusion_repository.save(fused)

    return fused


if __name__ == "__main__":

    mongodb.connect()

    try:

        data = fuse_data(
            latitude=12.9716,
            longitude=77.5946
        )

        pprint(data)

    finally:

        mongodb.disconnect()