from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector

from src.db import get_db_connection
from src.routing.router import route_complaint


app = FastAPI(title="Civic Complaint Routing API")


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://10.26.169.26:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# Request model
# ---------------------------------------------------------

class Complaint(BaseModel):
    issue_type: str
    latitude: float
    longitude: float
    complaint_date: str | None = None


# ---------------------------------------------------------
# Home
# ---------------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "Civic Complaint Routing API is running"
    }


# ---------------------------------------------------------
# Database health
# ---------------------------------------------------------

@app.get("/api/health/db")
def database_health():
    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute(
            "SELECT DATABASE(), USER()"
        )

        database, user = cursor.fetchone()

        return {
            "status": "ok",
            "database": database,
            "mysql_user": user
        }

    except mysql.connector.Error as exc:
        raise HTTPException(
            status_code=503,
            detail=f"MySQL connection failed: {exc}"
        )

    finally:
        if cursor is not None:
            cursor.close()

        if connection is not None:
            connection.close()


# ---------------------------------------------------------
# Create complaint
# ---------------------------------------------------------

@app.post("/api/complaints")
def create_complaint(complaint: Complaint):

    # First run the existing routing logic.
    result = route_complaint(
        complaint.issue_type,
        complaint.latitude,
        complaint.longitude,
        complaint.complaint_date
    )

    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO complaints (
                description,
                latitude,
                longitude,
                routing_confidence,
                routing_reason
            )
            VALUES (%s, %s, %s, %s, %s)
            """,
            (
                complaint.issue_type,
                complaint.latitude,
                complaint.longitude,
                result.get("confidence"),
                result.get("reason")
            )
        )

        connection.commit()

        result["complaint_id"] = cursor.lastrowid

        return result

    except mysql.connector.Error as exc:

        if connection is not None:
            connection.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Failed to save complaint: {exc}"
        )

    finally:

        if cursor is not None:
            cursor.close()

        if connection is not None:
            connection.close()


# ---------------------------------------------------------
# Get complaints
# ---------------------------------------------------------

@app.get("/api/complaints")
def get_complaints():

    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                complaint_id,
                description,
                latitude,
                longitude,
                routing_confidence,
                routing_reason,
                status,
                created_at,
                updated_at
            FROM complaints
            ORDER BY created_at DESC
            """
        )

        complaints = cursor.fetchall()

        return {
            "complaints": complaints
        }

    except mysql.connector.Error as exc:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to load complaints: {exc}"
        )

    finally:

        if cursor is not None:
            cursor.close()

        if connection is not None:
            connection.close()