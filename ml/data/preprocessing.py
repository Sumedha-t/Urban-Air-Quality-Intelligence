"""
Data loading and preprocessing for PRSA air quality datasets.
"""

from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from ml.config import (
    CATEGORICAL_FEATURES,
    DATA_DIR,
    NUMERIC_FEATURES,
    RANDOM_STATE,
    TARGET_COLUMN,
    TEST_SIZE,
    VAL_SIZE,
)


def load_raw_data(data_dir: Path | None = None) -> pd.DataFrame:
    """
    Load and combine all PRSA station CSV files.
    """

    data_dir = data_dir or DATA_DIR
    csv_files = sorted(data_dir.glob("PRSA_Data_*.csv"))

    if not csv_files:
        raise FileNotFoundError(
            f"No PRSA CSV files found in {data_dir}"
        )

    frames = []

    for csv_path in csv_files:
        frame = pd.read_csv(csv_path)
        frames.append(frame)

    data = pd.concat(frames, ignore_index=True)

    return data


def engineer_features(data: pd.DataFrame) -> pd.DataFrame:
    """
    Build datetime and cyclical time features.
    """

    frame = data.copy()

    frame["datetime"] = pd.to_datetime(
        frame[["year", "month", "day", "hour"]]
    )

    frame["hour_sin"] = np.sin(2 * np.pi * frame["hour"] / 24)
    frame["hour_cos"] = np.cos(2 * np.pi * frame["hour"] / 24)
    frame["month_sin"] = np.sin(2 * np.pi * frame["month"] / 12)
    frame["month_cos"] = np.cos(2 * np.pi * frame["month"] / 12)
    frame["day_of_year"] = frame["datetime"].dt.dayofyear
    frame["day_sin"] = np.sin(2 * np.pi * frame["day_of_year"] / 365)
    frame["day_cos"] = np.cos(2 * np.pi * frame["day_of_year"] / 365)

    return frame


def clean_data(data: pd.DataFrame) -> pd.DataFrame:
    """
    Replace sentinel values and drop rows without target.
    """

    frame = data.copy()

    numeric_cols = NUMERIC_FEATURES + [TARGET_COLUMN]

    for column in numeric_cols:
        frame[column] = pd.to_numeric(frame[column], errors="coerce")

    frame.replace(
        to_replace=[-1, -999, 999990, 999999],
        value=np.nan,
        inplace=True,
    )

    frame = frame.dropna(subset=[TARGET_COLUMN])

    return frame


def build_preprocessor() -> ColumnTransformer:
    """
    Create sklearn preprocessing pipeline.
    """

    numeric_features = NUMERIC_FEATURES + [
        "hour_sin",
        "hour_cos",
        "month_sin",
        "month_cos",
        "day_sin",
        "day_cos",
    ]

    numeric_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
        ]
    )

    categorical_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            (
                "encoder",
                OneHotEncoder(
                    handle_unknown="ignore",
                    sparse_output=False,
                ),
            ),
        ]
    )

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_pipeline, numeric_features),
            ("cat", categorical_pipeline, CATEGORICAL_FEATURES),
        ]
    )

    return preprocessor


def load_and_preprocess(data_dir: Path | None = None):
    """
    Full preprocessing pipeline returning cleaned dataframe and preprocessor.
    """

    raw = load_raw_data(data_dir)
    cleaned = clean_data(raw)
    featured = engineer_features(cleaned)
    preprocessor = build_preprocessor()

    return featured, preprocessor


def split_data(
    data: pd.DataFrame,
    preprocessor: ColumnTransformer,
):
    """
    Time-aware split: train / validation / test.
    """

    data = data.sort_values("datetime").reset_index(drop=True)

    feature_columns = (
        NUMERIC_FEATURES
        + CATEGORICAL_FEATURES
        + [
            "hour_sin",
            "hour_cos",
            "month_sin",
            "month_cos",
            "day_sin",
            "day_cos",
        ]
    )

    X = data[feature_columns]
    y = data[TARGET_COLUMN]

    test_count = int(len(data) * TEST_SIZE)
    val_count = int(len(data) * VAL_SIZE)
    train_count = len(data) - test_count - val_count

    X_train = X.iloc[:train_count]
    y_train = y.iloc[:train_count]

    X_val = X.iloc[train_count : train_count + val_count]
    y_val = y.iloc[train_count : train_count + val_count]

    X_test = X.iloc[train_count + val_count :]
    y_test = y.iloc[train_count + val_count :]

    X_train = preprocessor.fit_transform(X_train)
    X_val = preprocessor.transform(X_val)
    X_test = preprocessor.transform(X_test)

    return {
        "X_train": X_train,
        "y_train": y_train.to_numpy(),
        "X_val": X_val,
        "y_val": y_val.to_numpy(),
        "X_test": X_test,
        "y_test": y_test.to_numpy(),
        "preprocessor": preprocessor,
    }
