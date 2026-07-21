from backend.database.mongodb import mongodb
from backend.repositories.aqi_repository import aqi_repository

mongodb.connect()

sample = {
    "aqi": 2,
    "source": "Test",
    "city": "Bangalore"
}

document_id = aqi_repository.save(sample)

print(f"Inserted document ID: {document_id}")

mongodb.disconnect()