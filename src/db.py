import os
from pathlib import Path

import mysql.connector
from dotenv import load_dotenv

# Project root is one level above src/
PROJECT_ROOT = Path(__file__).resolve().parent.parent
ENV_FILE = PROJECT_ROOT / ".env"

# Load the project's root .env regardless of the directory used to start Uvicorn.
load_dotenv(dotenv_path=ENV_FILE)


def get_db_connection():
    """Create a connection to the MySQL civic-routing database."""
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "127.0.0.1"),
        port=int(os.getenv("DB_PORT", "3306")),
        user=os.getenv("DB_USER", "civic_app"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME", "hackmysuru_civic_routing"),
    )
