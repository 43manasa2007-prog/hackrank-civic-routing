import json
import os
from datetime import date


# ---------------------------------------------------------
# File paths
# ---------------------------------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

BOUNDARY_FILE = os.path.join(
    BASE_DIR,
    "data",
    "boundaries.json"
)

JURISDICTION_FILE = os.path.join(
    BASE_DIR,
    "data",
    "jurisdiction_boundaries.geojson"
)

JURISDICTION_INFO_FILE = os.path.join(
    BASE_DIR,
    "data",
    "jurisdictions.json"
)


# ---------------------------------------------------------
# Load old ward boundary data
# ---------------------------------------------------------

def load_boundaries():
    """Load ward and jurisdiction boundary data."""

    with open(
        BOUNDARY_FILE,
        "r",
        encoding="utf-8"
    ) as file:
        return json.load(file)


# ---------------------------------------------------------
# Load jurisdiction GeoJSON
# ---------------------------------------------------------

def load_jurisdiction_boundaries():
    """Load jurisdiction polygon data."""

    with open(
        JURISDICTION_FILE,
        "r",
        encoding="utf-8"
    ) as file:
        return json.load(file)


# ---------------------------------------------------------
# Load jurisdiction information
# ---------------------------------------------------------

def load_jurisdictions():
    """Load jurisdiction authority and version information."""

    with open(
        JURISDICTION_INFO_FILE,
        "r",
        encoding="utf-8"
    ) as file:
        return json.load(file)


# ---------------------------------------------------------
# Existing ward detection
# ---------------------------------------------------------

def find_jurisdiction(latitude, longitude):
    """
    Find the ward/jurisdiction for a GPS location.

    This keeps the original Member 1 routing behavior.
    """

    # Validate latitude
    if not (-90 <= latitude <= 90):
        return {
            "jurisdiction": "Manual Review",
            "ward": None,
            "confidence": 0.0,
            "reason": "Invalid latitude"
        }

    # Validate longitude
    if not (-180 <= longitude <= 180):
        return {
            "jurisdiction": "Manual Review",
            "ward": None,
            "confidence": 0.0,
            "reason": "Invalid longitude"
        }

    data = load_boundaries()

    for ward in data["wards"]:

        inside = (
            ward["min_lat"] <= latitude <= ward["max_lat"]
            and
            ward["min_lng"] <= longitude <= ward["max_lng"]
        )

        if inside:
            return {
                "jurisdiction": ward["jurisdiction"],
                "ward": ward["ward_id"],
                "ward_name": ward["ward_name"],
                "confidence": 0.90,
                "reason": "Location matched with ward boundary"
            }

    return {
        "jurisdiction": "Manual Review",
        "ward": None,
        "confidence": 0.30,
        "reason": "Location is outside known boundaries"
    }


# ---------------------------------------------------------
# Point-in-polygon check
# ---------------------------------------------------------

def point_in_polygon(latitude, longitude, polygon):
    """
    Check whether a GPS point is inside a polygon.

    GeoJSON coordinates are stored as:
    [longitude, latitude]
    """

    inside = False

    for i in range(len(polygon)):
        lon1, lat1 = polygon[i]
        lon2, lat2 = polygon[(i + 1) % len(polygon)]

        if ((lat1 > latitude) != (lat2 > latitude)):

            intersection_lon = (
                (lon2 - lon1)
                * (latitude - lat1)
                / (lat2 - lat1)
                + lon1
            )

            if longitude < intersection_lon:
                inside = not inside

    return inside


# ---------------------------------------------------------
# Date-based jurisdiction routing
# ---------------------------------------------------------

def find_versioned_jurisdiction(
    latitude,
    longitude,
    complaint_date
):
    """
    Find the jurisdiction version applicable to a location
    on a particular date.
    """

    try:
        requested_date = date.fromisoformat(complaint_date)
    except (ValueError, TypeError):
        return {
            "jurisdiction_id": None,
            "authority_name": None,
            "authority_type": None,
            "version": None,
            "confidence": 0.0,
            "reason": "Invalid complaint date"
        }

    boundary_data = load_jurisdiction_boundaries()
    jurisdiction_data = load_jurisdictions()

    # Check each geographic polygon
    for feature in boundary_data["features"]:

        properties = feature["properties"]

        jurisdiction_id = properties["jurisdiction_id"]

        effective_from = date.fromisoformat(
            properties["effective_from"]
        )

        effective_to_text = properties.get("effective_to")

        effective_to = (
            date.fromisoformat(effective_to_text)
            if effective_to_text
            else None
        )

        # Check date validity
        date_valid = (
            effective_from <= requested_date
            and
            (
                effective_to is None
                or requested_date <= effective_to
            )
        )

        if not date_valid:
            continue

        # Check polygon
        coordinates = feature["geometry"]["coordinates"][0]

        if point_in_polygon(
            latitude,
            longitude,
            coordinates
        ):

            # Find matching jurisdiction information
            for jurisdiction in jurisdiction_data["jurisdictions"]:

                if (
                    jurisdiction["id"] == jurisdiction_id
                    and
                    jurisdiction["version"]
                    == properties["version"]
                ):

                    return {
                        "jurisdiction_id": jurisdiction["id"],
                        "authority_name": jurisdiction["authority_name"],
                        "authority_type": jurisdiction["authority_type"],
                        "version": jurisdiction["version"],
                        "confidence": 0.90,
                        "reason": (
                            "Location matched with "
                            "versioned jurisdiction boundary"
                        )
                    }

    return {
        "jurisdiction_id": None,
        "authority_name": None,
        "authority_type": None,
        "version": None,
        "confidence": 0.30,
        "reason": (
            "No active jurisdiction boundary "
            "matched for the requested date"
        )
    }


# ---------------------------------------------------------
# Complaint routing
# ---------------------------------------------------------

def route_complaint(
    issue_type,
    latitude,
    longitude,
    complaint_date=None
):
    """
    Route a complaint using issue type, geographic location,
    ward information, and optional jurisdiction date.

    complaint_date is optional so existing API/tests continue
    to work.
    """

    issue_type = issue_type.lower().strip()

    # Keep existing ward routing
    routing_result = find_jurisdiction(
        latitude,
        longitude
    )

    routing_result["issue_type"] = issue_type

    # Add versioned jurisdiction information when a date
    # is provided.
    if complaint_date is not None:

        versioned_result = find_versioned_jurisdiction(
            latitude,
            longitude,
            complaint_date
        )

        routing_result["jurisdiction_id"] = (
            versioned_result["jurisdiction_id"]
        )

        routing_result["authority_name"] = (
            versioned_result["authority_name"]
        )

        routing_result["authority_type"] = (
            versioned_result["authority_type"]
        )

        routing_result["jurisdiction_version"] = (
            versioned_result["version"]
        )

        routing_result["jurisdiction_confidence"] = (
            versioned_result["confidence"]
        )

        routing_result["jurisdiction_reason"] = (
            versioned_result["reason"]
        )

        routing_result["complaint_date"] = complaint_date

    return routing_result