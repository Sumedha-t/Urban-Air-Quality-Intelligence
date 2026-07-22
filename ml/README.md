# ML Training Pipeline

Train PM2.5 prediction models on the PRSA Beijing air quality dataset (2013–2017).

## Dataset

- Location: `ml/datasets/raw/PRSA_Data_20130301-20170228/`
- 12 monitoring stations, hourly readings
- **Target**: `PM2.5`
- **Features**: pollutants, weather, wind, station, cyclical time features

## Setup

From the **project root**:

```powershell
cd c:\Users\praty\Downloads\Urban-Air-Quality-Intelligence

# Create and activate virtual environment (recommended)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install backend + ML dependencies
pip install -r requirements.txt
pip install -r ml/requirements.txt
```

## Train Individual Models

Run from the **project root** (required for imports):

```powershell
# Linear Regression (SGD with L2 regularization)
python -m ml.train_linear_regression

# XGBoost
python -m ml.train_xgboost

# LightGBM
python -m ml.train_lightgbm

# Random Forest
python -m ml.train_random_forest
```

## Train All Models

```powershell
python -m ml.train_all
```

## What Each Script Does

1. **Load** all 12 PRSA CSV files and combine them
2. **Preprocess**
   - Replace invalid sentinel values with NaN
   - Impute missing numeric/categorical values
   - One-hot encode `station` and `wd` (wind direction)
   - Scale numeric features
   - Add cyclical time features (hour/month/day sin/cos)
3. **Split** chronologically into train (70%) / validation (15%) / test (15%)
4. **Train iteratively** with epochs/rounds and **early stopping** on validation RMSE
5. **Evaluate** on validation and test sets
6. **Save** the best model and metrics

## Evaluation Metrics

| Metric | Description |
|--------|-------------|
| RMSE | Root Mean Squared Error |
| MAE | Mean Absolute Error |
| MAPE | Mean Absolute Percentage Error |
| R² | Coefficient of determination |
| Adjusted R² | R² penalized for feature count |
| Accuracy | AQI class match (PM2.5 binned into 6 categories) |
| Precision / Recall / F1 | Macro and weighted (classification view) |

## Output Files

| Path | Description |
|------|-------------|
| `ml/models/<model>_best.joblib` | Best saved model |
| `ml/models/<model>_preprocessor.joblib` | Fitted preprocessor |
| `ml/results/<model>_metrics_<timestamp>.json` | Metrics + training history |

## Configuration

Edit `ml/config.py` to tune:

- `MAX_EPOCHS` — maximum training rounds (default: 200)
- `EARLY_STOPPING_PATIENCE` — stop after N rounds without improvement (default: 15)
- `TEST_SIZE` / `VAL_SIZE` — holdout proportions
- `TARGET_COLUMN` — prediction target (default: `PM2.5`)

## Load a Saved Model

```python
import joblib

model = joblib.load("ml/models/xgboost_best.joblib")
preprocessor = joblib.load("ml/models/xgboost_preprocessor.joblib")

# X_raw = dataframe with same columns as training features
# X = preprocessor.transform(X_raw)
# prediction = model.predict(X)
```

## Expected Runtime

On ~420k rows, expect roughly:

- Linear Regression: 2–5 min
- XGBoost / LightGBM: 5–15 min each
- Random Forest: 10–20 min

Use `python -m ml.train_all` only when you want to train everything in one go.
