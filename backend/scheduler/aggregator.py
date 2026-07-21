"""
Zone Aggregation Utilities.
"""

from collections import Counter
from statistics import mean


def average(values):
    values = [v for v in values if v is not None]

    if not values:
        return None

    return round(mean(values), 2)


def most_common(values):
    values = [v for v in values if v is not None]

    if not values:
        return None

    return Counter(values).most_common(1)[0][0]


def aggregate_zone(zone_name, snapshots):

    if not snapshots:
        return None

    first = snapshots[0]

    aqi = [s["sources"]["aqi"]["aqi"] for s in snapshots]

    pm25 = [
        s["sources"]["aqi"]["pollutants"]["pm2_5"]
        for s in snapshots
    ]

    pm10 = [
        s["sources"]["aqi"]["pollutants"]["pm10"]
        for s in snapshots
    ]

    temperature = [
        s["sources"]["weather"]["temperature"]
        for s in snapshots
    ]

    humidity = [
        s["sources"]["weather"]["humidity"]
        for s in snapshots
    ]

    pressure = [
        s["sources"]["weather"]["pressure"]
        for s in snapshots
    ]

    wind_speed = [
        s["sources"]["weather"]["wind_speed"]
        for s in snapshots
    ]

    cloud_cover = [
        s["sources"]["weather"]["cloud_cover"]
        for s in snapshots
    ]

    weather_type = [
        s["sources"]["weather"]["weather"]
        for s in snapshots
    ]

    current_speed = [
        s["sources"]["traffic"]["current_speed"]
        for s in snapshots
    ]

    free_flow_speed = [
        s["sources"]["traffic"]["free_flow_speed"]
        for s in snapshots
    ]

    travel_time = [
        s["sources"]["traffic"]["current_travel_time"]
        for s in snapshots
    ]

    warnings = []

    for snapshot in snapshots:
        warnings.extend(snapshot["warnings"])

    aggregated = {

        "zone_id": zone_name.lower().replace(" ", "_"),

        "zone": zone_name,

        "sample_count": len(snapshots),

        "collection_time": first["collection_time"],

        "location": first["location"],

        "air_quality": {

            "aqi": average(aqi),

            "pm2_5": average(pm25),

            "pm10": average(pm10)

        },

        "weather": {

            "temperature": average(temperature),

            "humidity": average(humidity),

            "pressure": average(pressure),

            "wind_speed": average(wind_speed),

            "cloud_cover": average(cloud_cover),

            "dominant_condition": most_common(weather_type)

        },

        "traffic": {

            "current_speed": average(current_speed),

            "free_flow_speed": average(free_flow_speed),

            "travel_time": average(travel_time)

        },

        "confidence": average(
            [s["confidence"] for s in snapshots]
        ),

        "warnings": list(set(warnings))
    }

    return aggregated