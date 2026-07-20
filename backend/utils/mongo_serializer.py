"""
MongoDB Serialization Utilities

Converts MongoDB documents into JSON-safe dictionaries.
"""

from datetime import datetime
from bson import ObjectId


def serialize_document(document: dict | None):
    """
    Serialize a single MongoDB document.
    """

    if document is None:
        return None

    serialized = {}

    for key, value in document.items():

        if isinstance(value, ObjectId):
            serialized[key] = str(value)

        elif isinstance(value, datetime):
            serialized[key] = value.isoformat()

        elif isinstance(value, dict):
            serialized[key] = serialize_document(value)

        elif isinstance(value, list):

            serialized[key] = [

                serialize_document(item)
                if isinstance(item, dict)
                else item

                for item in value
            ]

        else:
            serialized[key] = value

    return serialized


def serialize_documents(documents):
    """
    Serialize a list of MongoDB documents.
    """

    return [
        serialize_document(doc)
        for doc in documents
    ]