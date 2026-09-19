# HackMysuru Civic Routing — Database Setup

## What this file is
`HackMysuru_Mysuru_Routing_2026_TEAM.sql` is the shared-team MySQL setup/data script.

## Import
1. Open MySQL Workbench.
2. Connect to the MySQL server.
3. Open `HackMysuru_Mysuru_Routing_2026_TEAM.sql`.
4. Execute the whole script.
5. Refresh Schemas.
6. Confirm `hackmysuru_civic_routing` exists.

## Important
This TEAM script uses `CREATE DATABASE IF NOT EXISTS`; it does not intentionally drop the database first.

## Verify
Run:

```sql
USE hackmysuru_civic_routing;
SHOW TABLES;
SELECT COUNT(*) AS authority_count FROM authorities;
SELECT COUNT(*) AS ward_count FROM wards;
SELECT COUNT(*) AS locality_count FROM localities;
SELECT COUNT(*) AS issue_count FROM issue_categories;
SELECT * FROM v_current_locality_routing LIMIT 10;
SELECT * FROM v_current_issue_routing LIMIT 10;
```

Expected core counts in this project snapshot:
- authorities: 15
- wards: 65
- issue categories: 27

The database contains current-operational routing data plus notified/future GMCC transition data. The GeoJSON boundary file remains a separate application data file.
