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