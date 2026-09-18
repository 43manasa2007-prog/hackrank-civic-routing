# HackMysuru 1.0 – Civic Complaint Routing System
## Testing Documentation

### Project
Civic Governance & Clean Mysuru

### Sub-Problem
Routing

### Role
Member 4 – Testing & Documentation

---

# 1. Testing Objective

The objective of testing is to verify that the civic complaint
routing system correctly identifies the responsible authority
and department based on the citizen's complaint type and location.

The system should also handle the changing Mysuru jurisdiction
structure and invalid or incomplete user inputs.

---

# 2. Testing Areas

The following areas will be tested:

1. Complaint submission
2. Issue selection
3. Location selection
4. Authority routing
5. Department routing
6. Jurisdiction handling
7. Invalid input validation
8. Database connectivity
9. End-to-end complaint routing
10. Error handling
11. Regression testing

---

# 3. Test Cases

## TC-001 – Pothole Complaint

**Input:**
- Issue: Pothole
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority and
Engineering / Roads department.

**Status:** Not Tested

---

## TC-002 – Damaged Road Complaint

**Input:**
- Issue: Damaged Road
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority and
Engineering / Roads department.

**Status:** Not Tested

---

## TC-003 – Garbage Not Collected

**Input:**
- Issue: Garbage Not Collected
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority and
Solid Waste Management department.

**Status:** Not Tested

---

## TC-004 – Overflowing Garbage Bin

**Input:**
- Issue: Overflowing Garbage Bin
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority and
Solid Waste Management department.

**Status:** Not Tested

---

## TC-005 – Illegal Dumping

**Input:**
- Issue: Illegal Dumping
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority
responsible for solid waste management.

**Status:** Not Tested

---

## TC-006 – Streetlight Not Working

**Input:**
- Issue: Streetlight Not Working
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority and
Electricity / Street Lighting department.

**Status:** Not Tested

---

## TC-007 – Electrical Hazard

**Input:**
- Issue: Electrical Hazard
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority
responsible for the electrical/street-lighting issue.

**Status:** Not Tested

---

## TC-008 – Water Leakage

**Input:**
- Issue: Water Leakage
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority and
Water Supply department.

**Status:** Not Tested

---

## TC-009 – No Water Supply

**Input:**
- Issue: No Water Supply
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority and
Water Supply department.

**Status:** Not Tested

---

## TC-010 – Blocked Drain

**Input:**
- Issue: Blocked Drain
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority and
Underground Drainage / relevant drainage department.

**Status:** Not Tested

---

## TC-011 – Sewage Overflow

**Input:**
- Issue: Sewage Overflow
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority
responsible for underground drainage/sewage.

**Status:** Not Tested

---

## TC-012 – Unauthorized Construction

**Input:**
- Issue: Unauthorized Construction
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority and
Town Planning / Building department.

**Status:** Not Tested

---

## TC-013 – Property / Khata Issue

**Input:**
- Issue: Property / Khata Issue
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority and
Property / Khata department.

**Status:** Not Tested

---

## TC-014 – Trade Licence Issue

**Input:**
- Issue: Trade Licence Issue
- Location: Mysuru

**Expected Result:**
The complaint should be routed to the appropriate authority and
Trade Licence department.

**Status:** Not Tested

---

# 4. Location-Based Testing

## TC-015 – Hootagalli Location

**Input:**
- Location: Hootagalli
- Issue: Garbage Not Collected

**Expected Result:**
The system should identify the correct jurisdiction for Hootagalli
and route the complaint to the appropriate solid waste authority.

**Status:** Not Tested

---

## TC-016 – Kadakola Location

**Input:**
- Location: Kadakola
- Issue: Pothole

**Expected Result:**
The system should identify the correct jurisdiction for Kadakola
and route the complaint to the appropriate roads/engineering authority.

**Status:** Not Tested

---

## TC-017 – Alanahalli Location

**Input:**
- Location: Alanahalli
- Issue: Streetlight Not Working

**Expected Result:**
The system should identify the correct jurisdiction for Alanahalli
and route the complaint to the appropriate electricity/street-lighting
authority.

**Status:** Not Tested

---

## TC-018 – Srirampura Location

**Input:**
- Location: Srirampura
- Issue: Damaged Road

**Expected Result:**
The system should determine the correct jurisdiction and route the
complaint to the appropriate roads/engineering authority.

**Status:** Not Tested

---

# 5. Invalid Input Testing

## TC-019 – Empty Issue

**Input:**
- Issue: Empty
- Location: Hootagalli

**Expected Result:**
The system should display a validation message asking the citizen
to select or enter an issue.

**Status:** Not Tested

---

## TC-020 – Empty Location

**Input:**
- Issue: Pothole
- Location: Empty

**Expected Result:**
The system should display a validation message asking the citizen
to provide a location.

**Status:** Not Tested

---

## TC-021 – Both Issue and Location Empty

**Input:**
- Issue: Empty
- Location: Empty

**Expected Result:**
The system should prevent submission and display appropriate
validation messages.

**Status:** Not Tested

---

## TC-022 – Invalid Location

**Input:**
- Issue: Pothole
- Location: ABCXYZ123

**Expected Result:**
The system should indicate that the location is invalid or not found.
The application should not crash.

**Status:** Not Tested

---

# 6. Database Testing

## TC-023 – Issue Category Lookup

**Action:**
Submit/select a valid issue category.

**Expected Result:**
The backend should successfully retrieve the corresponding issue
category from the MySQL database.

**Status:** Not Tested

---

## TC-024 – Authority Lookup

**Action:**
Submit a complaint with a valid location and issue.

**Expected Result:**
The backend should retrieve the appropriate authority from the
database.

**Status:** Not Tested

---

## TC-025 – Department Lookup

**Action:**
Submit a complaint with a valid issue.

**Expected Result:**
The backend should retrieve the appropriate department from the
database.

**Status:** Not Tested

---

# 7. End-to-End Testing

## TC-026 – Complete Complaint Routing

**Steps:**

1. Open the application.
2. Select a civic issue.
3. Enter/select the complaint location.
4. Submit the complaint.
5. Verify that the frontend sends the information to the backend.
6. Verify that the backend queries the MySQL database.
7. Verify that the routing rule is applied.
8. Verify that the responsible authority is returned.
9. Verify that the result is displayed to the citizen.

**Expected Result:**
The complete complaint-routing process should work without errors.

**Status:** Not Tested

---

# 8. Regression Testing

After any change to the routing logic, database, frontend,
or backend, previously successful test cases should be executed
again to ensure that existing functionality still works.

**Status:** To be performed after development changes.