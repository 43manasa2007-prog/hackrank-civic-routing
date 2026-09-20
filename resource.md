# Project Resources & Decision Log

## 1. Project Resources

### Jurisdiction Data

The project uses structured Mysuru jurisdiction information including:

- 65 MCC wards
- Zones
- Localities
- Authorities
- Jurisdiction history
- 2026 expansion information

### Geographical Data

The project includes GeoJSON boundary data for Mysuru wards.

File:

`src/data/jurisdiction_boundaries.geojson`

### Database

The routing database is stored in MySQL.

Database setup files:

`database/HackMysuru_Mysuru_Routing_2026_TEAM.sql`

`database/START_HERE.md`

The database contains authorities, wards, localities, departments, issue categories, routing rules, jurisdiction history, complaints and routing logs.

---

# 2. Key Decisions

PS C:\Users\MANASA M N\OneDrive\Desktop\hackrank\hackrank-civic-routing> git pull --rebase origin feature/jurisdiction-data
remote: Enumerating objects: 8, done.
remote: Counting objects: 100% (8/8), done.
remote: Compressing objects: 100% (6/6), done.
remote: Total 6 (delta 4), reused 0 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (6/6), 2.29 KiB | 57.00 KiB/s, done.
From https://github.com/43manasa2007-prog/hackrank-civic-routing
 * branch            feature/jurisdiction-data -> FETCH_HEAD
   378892b..ab43077  feature/jurisdiction-data -> origin/feature/jurisdiction-data
Auto-merging resource.md
CONFLICT (content): Merge conflict in resource.md
error: could not apply 770c0de... Complete project documentation
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
hint: You can instead skip this commit: run "git rebase --skip".
hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
hint: Disable this message with "git config set advice.mergeConflict false"
Could not apply 770c0de... # Complete project documentation
PS C:\Users\MANASA M N\OneDrive\Desktop\hackrank\hackrank-civic-routing>