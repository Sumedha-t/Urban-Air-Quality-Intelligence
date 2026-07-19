"""
Central application configuration.

All API keys and environment variables
are loaded here.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# --------------------------------------------------
# Locate project root
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]

# --------------------------------------------------
# Load .env
# --------------------------------------------------

load_dotenv(BASE_DIR / ".env")


class Settings:
    """
    Global application settings.
    """

    OPENWEATHER_API_KEY = os.getenv(
        "OPENWEATHER_API_KEY"
    )

    TOMTOM_API_KEY = os.getenv(
        "TOMTOM_API_KEY"
    )

    if OPENWEATHER_API_KEY is None:
        raise ValueError(
            "OPENWEATHER_API_KEY not found in project .env"
        )

    if TOMTOM_API_KEY is None:
        raise ValueError(
            "TOMTOM_API_KEY not found in project .env"
        )


# Shared settings object
settings = Settings()