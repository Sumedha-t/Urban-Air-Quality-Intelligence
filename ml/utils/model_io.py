"""
Model persistence helpers.
"""

import json
from datetime import datetime
from pathlib import Path

import joblib

from ml.config import MODELS_DIR, RESULTS_DIR


def ensure_directories():
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)


def save_model(model, model_name: str, preprocessor=None):
    """
    Save trained model and optional preprocessor.
    """

    ensure_directories()

    model_path = MODELS_DIR / f"{model_name}_best.joblib"
    joblib.dump(model, model_path)

    if preprocessor is not None:
        preprocessor_path = MODELS_DIR / f"{model_name}_preprocessor.joblib"
        joblib.dump(preprocessor, preprocessor_path)

    print(f"Saved best model to: {model_path}")

    return model_path


def save_metrics(metrics: dict, model_name: str, history: list | None = None):
    """
    Save evaluation metrics and training history as JSON.
    """

    ensure_directories()

    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    output_path = RESULTS_DIR / f"{model_name}_metrics_{timestamp}.json"

    payload = {
        "model": model_name,
        "metrics": metrics,
        "history": history or [],
        "saved_at": timestamp,
    }

    with open(output_path, "w", encoding="utf-8") as file:
        json.dump(payload, file, indent=2)

    print(f"Saved metrics to: {output_path}")

    return output_path
