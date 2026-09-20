import sys

sys.path.insert(0, "src")

from routing.router import route_complaint


def test_valid_location():
    result = route_complaint(
        "blocked_drain",
        12.305,
        76.650
    )

    assert result["jurisdiction"] == "MCC"
    assert result["ward"] == "W01"
    assert result["confidence"] == 0.90


def test_outside_boundary():
    result = route_complaint(
        "blocked_drain",
        12.500,
        76.900
    )

    assert result["jurisdiction"] == "Manual Review"
    assert result["ward"] is None
    assert result["confidence"] == 0.30


def test_invalid_latitude():
    result = route_complaint(
        "blocked_drain",
        95.000,
        76.650
    )

    assert result["jurisdiction"] == "Manual Review"
    assert result["confidence"] == 0.0


def test_invalid_longitude():
    result = route_complaint(
        "blocked_drain",
        12.305,
        200.000
    )

    assert result["jurisdiction"] == "Manual Review"
    assert result["confidence"] == 0.0


def test_jurisdiction_version_before_change():
    result = route_complaint(
        "blocked_drain",
        12.2950,
        76.6350,
        "2026-09-15"
    )

    assert result["jurisdiction_id"] == "J001"
    assert result["authority_name"] == "Demo Municipal Authority"
    assert result["jurisdiction_version"] == 1
    assert result["jurisdiction_confidence"] == 0.90


def test_jurisdiction_version_after_change():
    result = route_complaint(
        "blocked_drain",
        12.2950,
        76.6350,
        "2026-10-15"
    )

    assert result["jurisdiction_id"] == "J002"
    assert result["authority_name"] == "Demo Town Panchayat"
    assert result["jurisdiction_version"] == 2
    assert result["jurisdiction_confidence"] == 0.90