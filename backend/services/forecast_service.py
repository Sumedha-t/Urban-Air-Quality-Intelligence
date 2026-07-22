"""
Forecast service using trained LightGBM model.
"""

from pathlib import Path
from datetime import datetime, timedelta
import math

import joblib
import pandas as pd


PROJECT_ROOT = Path(__file__).resolve().parents[2]

MODEL_PATH = PROJECT_ROOT / "ml" / "models" / "lightgbm_best.joblib"
PREPROCESSOR_PATH = PROJECT_ROOT / "ml" / "models" / "lightgbm_preprocessor.joblib"


class ForecastService:

    def __init__(self):
        self.model = joblib.load(MODEL_PATH)
        self.preprocessor = joblib.load(PREPROCESSOR_PATH)

    @staticmethod
    def degrees_to_direction(degrees):
        """
        Convert wind direction in degrees to compass direction.
        """

        if degrees is None:
            return "N"

        directions = [
            "N",
            "NE",
            "E",
            "SE",
            "S",
            "SW",
            "W",
            "NW",
        ]

        index = round(degrees / 45) % 8
        return directions[index]

    @staticmethod
    def calculate_dew_point(temp, humidity):
        """
        Approximate dew point from temperature and humidity.
        """

        if humidity is None:
            humidity = 50

        a = 17.27
        b = 237.7

        alpha = (
            (a * temp) / (b + temp)
            + math.log(max(humidity, 1) / 100)
        )

        return (b * alpha) / (a - alpha)

    def predict(self, aqi_data, weather_data, station="Bangalore"):
        """
        Predict PM2.5 using the trained LightGBM model.
        """

        timestamp = datetime.fromtimestamp(weather_data["timestamp"])

        year = timestamp.year
        month = timestamp.month
        day = timestamp.day
        hour = timestamp.hour

        day_of_year = timestamp.timetuple().tm_yday

        hour_sin = math.sin(2 * math.pi * hour / 24)
        hour_cos = math.cos(2 * math.pi * hour / 24)

        month_sin = math.sin(2 * math.pi * month / 12)
        month_cos = math.cos(2 * math.pi * month / 12)

        day_sin = math.sin(2 * math.pi * day_of_year / 365)
        day_cos = math.cos(2 * math.pi * day_of_year / 365)

        pollutants = aqi_data["pollutants"]

        dataframe = pd.DataFrame(
            [
                {
                    "year": year,
                    "month": month,
                    "day": day,
                    "hour": hour,
                    "hour_sin": hour_sin,
                    "hour_cos": hour_cos,
                    "month_sin": month_sin,
                    "month_cos": month_cos,
                    "day_sin": day_sin,
                    "day_cos": day_cos,
                    "PM10": pollutants.get("pm10", 0.0),
                    "SO2": pollutants.get("so2", 0.0),
                    "NO2": pollutants.get("no2", 0.0),
                    "CO": pollutants.get("co", 0.0),
                    "O3": pollutants.get("o3", 0.0),
                    "TEMP": weather_data.get("temperature", 0.0),
                    "PRES": weather_data.get("pressure", 1013.25),
                    "DEWP": self.calculate_dew_point(
                        weather_data.get("temperature", 0.0),
                        weather_data.get("humidity", 50),
                    ),
                    "RAIN": weather_data.get("rain", 0.0),
                    "WSPM": weather_data.get("wind_speed", 0.0),
                    "wd": self.degrees_to_direction(
                        weather_data.get("wind_direction")
                    ),
                    "station": station,
                }
            ]
        )

        transformed = self.preprocessor.transform(dataframe)

        prediction = float(self.model.predict(transformed)[0])
        predicted_pm25 = round(prediction, 2)

        current_pm25 = round(float(pollutants.get("pm2_5", predicted_pm25)), 2)

        combined = []

        combined.append(
            {
                "time": timestamp.strftime("%H:%M"),
                "aqi": current_pm25,
                "isFuture": False,
                "confidence": 100,
            }
        )

        for i in range(1, 7):
            future_time = timestamp + timedelta(hours=i)

            combined.append(
                {
                    "time": future_time.strftime("%H:%M"),
                    "aqi": predicted_pm25,
                    "isFuture": True,
                    "confidence": max(70, 100 - i * 5),
                }
            )

        return {
            "predicted_pm25": predicted_pm25,
            "generated_at": datetime.now().isoformat(),
            "combined": combined,
        }


forecast_service = ForecastService()