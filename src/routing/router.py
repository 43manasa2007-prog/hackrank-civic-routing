import json
import os


# Load boundary data
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOUNDARY_FILE = os.path.join(BASE_DIR, "data", "boundaries.json")


def load_boundaries():
    """Load ward and jurisdiction boundary data."""
    with open(BOUNDARY_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def find_jurisdiction(latitude, longitude):
    """
    Find the jurisdiction for a given GPS location.
    """

    # Validate latitude and longitude
    if not (-90 <= latitude <= 90):
        return {
            "jurisdiction": "Manual Review",
            "ward": None,
            "confidence": 0.0,
            "reason": "Invalid latitude"
        }

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

    # Location does not match any known boundary
    return {
        "jurisdiction": "Manual Review",
        "ward": None,
        "confidence": 0.30,
        "reason": "Location is outside known boundaries"
    }


def route_complaint(issue_type, latitude, longitude):
    """
    Route a complaint using issue type and geographic jurisdiction.
    """

    issue_type = issue_type.lower().strip()

    # First determine jurisdiction from location
    routing_result = find_jurisdiction(latitude, longitude)

    # If location cannot be mapped, send for manual review
    if routing_result["jurisdiction"] == "Manual Review":
        routing_result["issue_type"] = issue_type
        return routing_result

    # Add issue type to the routing result
    routing_result["issue_type"] = issue_type

    return routing_result