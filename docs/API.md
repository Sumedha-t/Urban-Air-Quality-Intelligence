# Urban Air Quality Intelligence Platform API

## Base URL

```
http://127.0.0.1:8000
```

---

## GET /

Returns server information.

---

## GET /health

Checks whether the backend is running.

---

## GET /aqi

Parameters

- latitude
- longitude

Returns live Air Quality Index information.

---

## GET /weather

Parameters

- latitude
- longitude

Returns live weather conditions.

---

## GET /traffic

Parameters

- latitude
- longitude

Returns live traffic information.

---

## GET /fusion

Parameters

- latitude
- longitude

Returns a unified environmental snapshot by combining AQI, weather, and traffic data.