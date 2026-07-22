"""
Train Linear Regression (SGD) with epoch-based early stopping.

Predicts PM2.5 from PRSA air quality data.
"""

from sklearn.linear_model import SGDRegressor

from ml.config import (
    EARLY_STOPPING_PATIENCE,
    MAX_EPOCHS,
    MIN_DELTA,
    RANDOM_STATE,
)
from ml.data.preprocessing import load_and_preprocess, split_data
from ml.utils.early_stopping import EarlyStopping, validation_rmse
from ml.utils.metrics import compute_all_metrics, print_metrics
from ml.utils.model_io import save_metrics, save_model

MODEL_NAME = "linear_regression"


def build_model() -> SGDRegressor:
    return SGDRegressor(
        loss="squared_error",
        penalty="l2",
        alpha=0.0001,
        learning_rate="invscaling",
        eta0=0.01,
        max_iter=1,
        warm_start=True,
        random_state=RANDOM_STATE,
    )


def train():
    print("Loading and preprocessing PRSA dataset...")
    data, preprocessor = load_and_preprocess()
    splits = split_data(data, preprocessor)

    X_train = splits["X_train"]
    y_train = splits["y_train"]
    X_val = splits["X_val"]
    y_val = splits["y_val"]
    X_test = splits["X_test"]
    y_test = splits["y_test"]

    n_features = X_train.shape[1]
    model = build_model()
    early_stopping = EarlyStopping(
        patience=EARLY_STOPPING_PATIENCE,
        min_delta=MIN_DELTA,
    )

    history = []

    print(f"\nTraining {MODEL_NAME} for up to {MAX_EPOCHS} epochs...")

    for epoch in range(1, MAX_EPOCHS + 1):
        model.partial_fit(X_train, y_train)

        train_rmse = validation_rmse(model, X_train, y_train)
        val_rmse = validation_rmse(model, X_val, y_val)

        history.append(
            {
                "epoch": epoch,
                "train_rmse": train_rmse,
                "val_rmse": val_rmse,
            }
        )

        print(
            f"Epoch {epoch:03d} | "
            f"Train RMSE: {train_rmse:.4f} | "
            f"Val RMSE: {val_rmse:.4f}"
        )

        if early_stopping.step(model, val_rmse, epoch):
            print(
                f"\nEarly stopping at epoch {epoch}. "
                f"Best epoch: {early_stopping.best_epoch} "
                f"(Val RMSE: {early_stopping.best_score:.4f})"
            )
            break

    best_model = early_stopping.best_model or model

    val_preds = best_model.predict(X_val)
    test_preds = best_model.predict(X_test)

    val_metrics = compute_all_metrics(
        y_val, val_preds, n_features, split_name="validation"
    )
    test_metrics = compute_all_metrics(
        y_test, test_preds, n_features, split_name="test"
    )

    print_metrics(val_metrics)
    print_metrics(test_metrics)

    save_model(best_model, MODEL_NAME, preprocessor)
    save_metrics(
        {"validation": val_metrics, "test": test_metrics},
        MODEL_NAME,
        history=history,
    )


if __name__ == "__main__":
    train()
