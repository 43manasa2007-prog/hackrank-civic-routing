# SAMAGRA MYSURU — Decision Log

## HackMysuru 1.0 — Civic Governance & Clean Mysuru

**Project:** SAMAGRA MYSURU  
**Team:** HackMysuru 1.0  
**Problem Area:** Civic Governance & Clean Mysuru  
**Sub-problem:** Routing  
**Repository:** hackrank-civic-routing

---

## Decision 1 — Use location-based complaint routing

**Decision:**  
The system will route civic complaints based on the complaint location and issue type.

**Reason:**  
A complaint should be directed to the authority responsible for the location and the relevant civic service.

**Impact:**  
The backend can determine the responsible authority and department instead of relying only on manually selected authorities.

---

## Decision 2 — Maintain 2026 Mysuru jurisdiction data

**Decision:**  
The project will maintain a 2026 jurisdiction-routing dataset covering the existing Mysuru City Corporation wards and the relevant surrounding local authorities involved in the Greater Mysuru jurisdiction transition.

**Reason:**  
Mysuru's administrative jurisdiction is undergoing changes, so routing data needs to distinguish current operating authorities from future/not-yet-operational jurisdiction arrangements.

**Impact:**  
The routing database can support current authority routing while retaining information about jurisdiction changes.

---

## Decision 3 — Use 65 MCC wards in the routing dataset

**Decision:**  
The database includes all 65 Mysuru City Corporation wards.

**Reason:**  
The existing MCC ward structure is required for location-based routing within the corporation area.

**Impact:**  
Complaints associated with MCC wards can be mapped to the appropriate jurisdiction and routing rules.

---

## Decision 4 — Separate authorities, departments and routing rules

**Decision:**  
Authorities, departments and routing rules are stored as separate database entities.

**Reason:**  
An authority and a department are different concepts. Separating them makes the routing system easier to maintain and extend.

**Impact:**  
The same authority can contain multiple departments, and routing rules can connect an issue category with the appropriate department and authority.

---

## Decision 5 — Store jurisdiction history

**Decision:**  
Jurisdiction history and transition information are stored separately from current operating authority information.

**Reason:**  
A notified or proposed jurisdiction change should not automatically be treated as an active operating authority.

**Impact:**  
The system can retain future/transition information without incorrectly routing current complaints to a non-operational authority.

---

## Decision 6 — Use issue categories for routing

**Decision:**  
Civic complaints are classified into issue categories before being routed.

**Reason:**  
Different civic issues may be handled by different departments even within the same geographical authority.

**Impact:**  
The routing engine can use both location and issue type when determining the responsible department.

---

## Decision 7 — Use GeoJSON boundary data for location mapping

**Decision:**  
GeoJSON boundary data is maintained in the project for geographic jurisdiction mapping.

**Reason:**  
Latitude and longitude can be used with geographic boundaries to determine which jurisdiction contains a complaint location.

**Impact:**  
The application can support location-based routing using geographic boundary information.

---

## Decision 8 — Keep database setup in the repository

**Decision:**  
The MySQL database structure and data are provided through a SQL file in the repository.

**Reason:**  
Team members need a reproducible way to create the project database.

**Impact:**  
The database can be recreated on another development machine using the repository SQL file.

---

## Decision 9 — Keep the project presentation in the repository

**Decision:**  
The final HackMysuru presentation is stored in the `presentation` folder.

**Reason:**  
The presentation is part of the project's submission documentation and should remain associated with the project repository.

**Impact:**  
The project repository contains both implementation resources and the project presentation.

---

## Decision 10 — Use GitHub as the shared project repository

**Decision:**  
GitHub is used to maintain and share the project source code, data, database setup files and documentation.

**Reason:**  
The team needs a common version-controlled location for project work.

**Impact:**  
Project changes can be committed and synchronized through Git.

---

## Current Repository Status

- 2026 jurisdiction routing data: completed
- MySQL routing database: completed
- GeoJSON boundary data: included
- Project presentation: added
- Decision log: added
- Git branch: `feature/jurisdiction-data`

---

## Final Note

This decision log records the major technical and data decisions made for the SAMAGRA MYSURU project during HackMysuru 1.0.