"""
Reusable HTTP client.

All API requests in the project should
go through this module.
"""

import requests


def get_json(url: str, params: dict):
    """
    Send a GET request and return JSON.

    Parameters
    ----------
    url : str
        API endpoint.

    params : dict
        Query parameters.

    Returns
    -------
    dict | None
    """

    try:
        response = requests.get(
            url,
            params=params,
            timeout=10
        )

        response.raise_for_status()

        return response.json()

    except requests.exceptions.RequestException as error:

        print(f"HTTP Error: {error}")

        return None