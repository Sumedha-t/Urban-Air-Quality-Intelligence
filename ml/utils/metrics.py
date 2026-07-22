"""
Evaluation metrics for regression and AQI classification.
"""

import numpy as np
from sklearn.metrics import (
    accuracy_score,
    f1_score,
    mean_absolute_error,
    mean_squared_error,
    precision_score,
    r2_score,
    recall_score,
)

from ml.config import AQI_CLASS_BINS, AQI_CLASS_LABELS


def adjusted_r2(y_true, y_pred, n_features: int) -> float:
    """
    Compute adjusted R-squared.
    """

    n_samples = len(y_true)
    r2 = r2_score(y_true, y_pred)

    if n_samples <= n_features + 1:
        return float("nan")

    return 1 - ((1 - r2) * (n_samples - 1) / (n_samples - n_features - 1))


def pm25_to_aqi_class(values):
    """
    Map PM2.5 values to discrete AQI classes.
    """

    return np.digitize(values, bins=AQI_CLASS_BINS, right=True)


def compute_all_metrics(
    y_true,
    y_pred,
    n_features: int,
    split_name: str = "test",
) -> dict:
    """
    Compute regression and classification metrics.
    """

    y_true = np.asarray(y_true)
    y_pred = np.asarray(y_pred)

    rmse = float(np.sqrt(mean_squared_error(y_true, y_pred)))
    mae = float(mean_absolute_error(y_true, y_pred))

    with np.errstate(divide="ignore", invalid="ignore"):
        mape = float(
            np.mean(
                np.abs((y_true - y_pred) / np.maximum(np.abs(y_true), 1e-6))
            )
            * 100
        )

    r2 = float(r2_score(y_true, y_pred))
    adj_r2 = float(adjusted_r2(y_true, y_pred, n_features))

    true_classes = pm25_to_aqi_class(y_true)
    pred_classes = pm25_to_aqi_class(y_pred)

    metrics = {
        "split": split_name,
        "rmse": rmse,
        "mae": mae,
        "mape": mape,
        "r2": r2,
        "adjusted_r2": adj_r2,
        "accuracy": float(accuracy_score(true_classes, pred_classes)),
        "precision_macro": float(
            precision_score(
                true_classes,
                pred_classes,
                average="macro",
                zero_division=0,
            )
        ),
        "recall_macro": float(
            recall_score(
                true_classes,
                pred_classes,
                average="macro",
                zero_division=0,
            )
        ),
        "f1_macro": float(
            f1_score(
                true_classes,
                pred_classes,
                average="macro",
                zero_division=0,
            )
        ),
        "precision_weighted": float(
            precision_score(
                true_classes,
                pred_classes,
                average="weighted",
                zero_division=0,
            )
        ),
        "recall_weighted": float(
            recall_score(
                true_classes,
                pred_classes,
                average="weighted",
                zero_division=0,
            )
        ),
        "f1_weighted": float(
            f1_score(
                true_classes,
                pred_classes,
                average="weighted",
                zero_division=0,
            )
        ),
    }

    return metrics


def print_metrics(metrics: dict):
    """
    Pretty-print metric dictionary.
    """

    split_name = metrics.get("split", "unknown").upper()

    print(f"\n{'=' * 50}")
    print(f"Metrics ({split_name})")
    print(f"{'=' * 50}")
    print(f"RMSE           : {metrics['rmse']:.4f}")
    print(f"MAE            : {metrics['mae']:.4f}")
    print(f"MAPE (%)       : {metrics['mape']:.4f}")
    print(f"R2             : {metrics['r2']:.4f}")
    print(f"Adjusted R2    : {metrics['adjusted_r2']:.4f}")
    print(f"Accuracy       : {metrics['accuracy']:.4f}")
    print(f"Precision (macro): {metrics['precision_macro']:.4f}")
    print(f"Recall (macro) : {metrics['recall_macro']:.4f}")
    print(f"F1 (macro)     : {metrics['f1_macro']:.4f}")
    print(f"Precision (weighted): {metrics['precision_weighted']:.4f}")
    print(f"Recall (weighted): {metrics['recall_weighted']:.4f}")
    print(f"F1 (weighted)  : {metrics['f1_weighted']:.4f}")
    print(f"{'=' * 50}\n")
