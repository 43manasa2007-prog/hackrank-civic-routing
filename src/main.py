from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.routing.router import route_complaint


app = FastAPI(title="Civic Complaint Routing API")


# Allow the React frontend on Member 2's laptop
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Complaint(BaseModel):
    issue_type: str
    latitude: float
    longitude: float
    complaint_date: str | None = None


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
        complaint.longitude,
        complaint.complaint_date
    )

    return result