from fastapi import FastAPI
from pydantic import BaseModel

from src.routing.router import route_complaint
app = FastAPI(title="Civic Complaint Routing API")


class Complaint(BaseModel):
    issue_type: str
    latitude: float
    longitude: float


@app.get("/")
def home():
    return {
        "message": "Civic Complaint Routing API is running"
    }


@app.post("/api/complaints")
def create_complaint(complaint: Complaint):

    result = route_complaint(
        complaint.issue_type,
        complaint.latitude,
        complaint.longitude
    )

    return result