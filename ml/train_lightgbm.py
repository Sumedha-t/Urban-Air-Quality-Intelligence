"""
Train LightGBM regressor with round-based early stopping.

Predicts PM2.5 from PRSA air quality data.
"""

import lightgbm as lgb

from ml.config import (
    EARLY_STOPPING_PATIENCE,
    MAX_EPOCHS,
    RANDOM_STATE,
)
from ml.data.preprocessing import load_and_preprocess, split_data
from ml.utils.metrics import compute_all_metrics, print_metrics
from ml.utils.model_io import save_metrics, save_model

MODEL_NAME = "lightgbm"


def build_model() -> lgb.LGBMRegressor:
    return lgb.LGBMRegressor(
        objective="regression",
        n_estimators=MAX_EPOCHS,
        max_depth=8,
        learning_rate=0.05,
        num_leaves=63,
        subsample=0.8,
        colsample_bytree=0.8,
        reg_alpha=0.1,
        reg_lambda=1.0,
        random_state=RANDOM_STATE,
        n_jobs=-1,
        verbose=-1,
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

    print(f"\nTraining {MODEL_NAME} for up to {MAX_EPOCHS} boosting rounds...")

    model.fit(
        X_train,
        y_train,
        eval_set=[(X_train, y_train), (X_val, y_val)],
        eval_metric="rmse",
        callbacks=[
            lgb.early_stopping(
                stopping_rounds=EARLY_STOPPING_PATIENCE,
                verbose=True,
            ),
            lgb.log_evaluation(period=10),
        ],
    )

    best_round = model.best_iteration_
    print(f"\nEarly stopping selected round {best_round}")

    history = []
    eval_log = model.evals_result_

    train_rmse_log = eval_log["training"]["rmse"]
    val_rmse_log = eval_log["valid_1"]["rmse"]

    for index, val_rmse in enumerate(val_rmse_log, start=1):
        history.append(
            {
                "epoch": index,
                "train_rmse": train_rmse_log[index - 1],
                "val_rmse": val_rmse,
            }
        )

    val_preds = model.predict(X_val)
    test_preds = model.predict(X_test)

    val_metrics = compute_all_metrics(
        y_val, val_preds, n_features, split_name="validation"
    )
    test_metrics = compute_all_metrics(
        y_test, test_preds, n_features, split_name="test"
    )

    print_metrics(val_metrics)
    print_metrics(test_metrics)

    save_model(model, MODEL_NAME, preprocessor)
    save_metrics(
        {"validation": val_metrics, "test": test_metrics},
        MODEL_NAME,
        history=history,
    )


if __name__ == "__main__":
    train()
