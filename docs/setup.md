# Backend setup: FastAPI + MySQL

## 1. Create the local environment file

Copy `.env.example` to `.env` in the **project root** (`hackrank-civic-routing/.env`).

Use the password you set for the MySQL user `civic_app` in MySQL Workbench.

Example:

```text
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=civic_app
DB_PASSWORD=YOUR_CIVIC_APP_PASSWORD
DB_NAME=hackmysuru_civic_routing
```

Do **not** commit `.env`. It is already ignored by `.gitignore`.

## 2. Install backend dependencies

From the project root:

```powershell
python -m pip install -r requirements.txt
```

## 3. Test the MySQL connection from Python

From the project root:

```powershell
python -c "from src.db import get_db_connection; c=get_db_connection(); print('MYSQL CONNECTION SUCCESS'); c.close()"
```

## 4. Run FastAPI

From the project root:

```powershell
uvicorn src.main:app --reload
```

Then open:

```text
http://127.0.0.1:8000/api/health/db
```

A successful response contains:

```json
{
  "status": "ok",
  "database": "hackmysuru_civic_routing",
  "mysql_user": "civic_app@localhost"
}
```

## Important distinction

The current routing engine in `src/routing/router.py` still uses the JSON files in `src/data/` for ward/jurisdiction matching. The `/api/health/db` endpoint proves that FastAPI is connected to the real MySQL database, but it does not silently replace the existing routing rules with database queries.

To make `/api/complaints` read routing rules directly from the real MySQL tables, the exact column relationships of the live schema are needed; they should not be guessed.
