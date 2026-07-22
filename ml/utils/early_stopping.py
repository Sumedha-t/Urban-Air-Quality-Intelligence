"""
Early stopping utility for iterative training loops.
"""

import copy

import numpy as np
from sklearn.metrics import mean_squared_error


class EarlyStopping:
    """
    Stop training when validation RMSE stops improving.
    """

    def __init__(
        self,
        patience: int = 15,
        min_delta: float = 1e-4,
    ):
        self.patience = patience
        self.min_delta = min_delta
        self.best_score = float("inf")
        self.best_model = None
        self.counter = 0
        self.best_epoch = 0
        self.stopped_epoch = 0

    def step(self, model, val_rmse: float, epoch: int):
        """
        Update early stopping state. Returns True if training should stop.
        """

        if val_rmse < self.best_score - self.min_delta:
            self.best_score = val_rmse
            self.best_model = copy.deepcopy(model)
            self.best_epoch = epoch
            self.counter = 0
            return False

        self.counter += 1

        if self.counter >= self.patience:
            self.stopped_epoch = epoch
            return True

        return False


def validation_rmse(model, X_val, y_val) -> float:
    """
    Compute validation RMSE for a fitted model.
    """

    predictions = model.predict(X_val)
    return float(np.sqrt(mean_squared_error(y_val, predictions)))
