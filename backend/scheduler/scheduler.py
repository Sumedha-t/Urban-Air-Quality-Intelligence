"""
Environmental Data Scheduler

Automatically collects environmental
data from all monitoring zones.
"""

from apscheduler.schedulers.background import BackgroundScheduler

from backend.scheduler.locations import MONITORING_ZONES
from backend.scheduler.aggregator import aggregate_zone

from backend.agents.data_fusion import fuse_data

from backend.repositories.zone_repository import zone_repository


scheduler = BackgroundScheduler()


def collect_all_zones():
    """
    Collect data for every monitoring zone.
    """

    print("\n==============================")
    print("Scheduler started")
    print("==============================")

    for zone in MONITORING_ZONES:

        print(f"\nCollecting: {zone['name']}")

        snapshots = []

        for latitude, longitude in zone["samples"]:

            snapshot = fuse_data(
                latitude,
                longitude
            )

            snapshots.append(snapshot)

        aggregated = aggregate_zone(
            zone["name"],
            snapshots
        )

        zone_repository.save(aggregated)

        print(
            f"Saved zone snapshot: "
            f"{aggregated['zone']} "
            f"({aggregated['sample_count']} samples)"
        )

    print("\nScheduler finished\n")


def start_scheduler():
    """
    Start background scheduler.
    """

    # Collect immediately when backend starts
    collect_all_zones()

    scheduler.add_job(
        collect_all_zones,
        trigger="interval",
        minutes=15,
        id="environmental_collection",
        replace_existing=True,
    )

    scheduler.start()

    print("Background scheduler started.")


def stop_scheduler():
    """
    Stop scheduler.
    """

    if scheduler.running:
        scheduler.shutdown()

    print("Background scheduler stopped.")


if __name__ == "__main__":
    collect_all_zones()