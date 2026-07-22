"""
Shared configuration for ML training scripts.
"""

from pathlib import Path

ML_ROOT = Path(__file__).resolve().parent
DATA_DIR = ML_ROOT / "datasets" / "raw" / "PRSA_Data_20130301-20170228"
MODELS_DIR = ML_ROOT / "models"
RESULTS_DIR = ML_ROOT / "results"

TARGET_COLUMN = "PM2.5"

NUMERIC_FEATURES = [
    "year",
    "month",
    "day",
    "hour",
    "PM10",
    "SO2",
    "NO2",
    "CO",
    "O3",
    "TEMP",
    "PRES",
    "DEWP",
    "RAIN",
    "WSPM",
]

CATEGORICAL_FEATURES = ["wd", "station"]

RANDOM_STATE = 42
TEST_SIZE = 0.15
VAL_SIZE = 0.15

MAX_EPOCHS = 200
EARLY_STOPPING_PATIENCE = 15
MIN_DELTA = 1e-4

# PM2.5 breakpoints for AQI-style classification metrics
AQI_CLASS_BINS = [-1, 35, 75, 115, 150, 250, float("inf")]
AQI_CLASS_LABELS = [
    "Good",
    "Satisfactory",
    "Moderate",
    "Poor",
    "Very Poor",
    "Severe",
]
