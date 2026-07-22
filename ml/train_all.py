"""
Train all models sequentially.
"""

from ml.train_lightgbm import train as train_lightgbm
from ml.train_linear_regression import train as train_linear_regression
from ml.train_random_forest import train as train_random_forest
from ml.train_xgboost import train as train_xgboost


def main():
    trainers = [
        ("Linear Regression", train_linear_regression),
        ("XGBoost", train_xgboost),
        ("LightGBM", train_lightgbm),
        ("Random Forest", train_random_forest),
    ]

    for name, trainer in trainers:
        print("\n" + "#" * 60)
        print(f"# Training: {name}")
        print("#" * 60)
        trainer()


if __name__ == "__main__":
    main()
