# SAMAGRA MYSURU

## 1. Problem Understanding

### Chosen sub-problem
**Routing**

### The gap we saw

Mysuru citizens may not always know which civic authority is responsible for a particular issue at a particular location. This becomes more challenging during the 2026 Mysuru jurisdiction transition, where the existing MCC area is being considered alongside surrounding municipal, town panchayat and gram panchayat areas.

A complaint can therefore reach the wrong office or require manual identification of the responsible authority before action can begin.

### Why it matters

Incorrect routing can result in:

- Delayed complaint handling
- Complaints being transferred between offices
- Additional effort for citizens and officials
- Difficulty identifying responsibility in boundary areas
- Reduced visibility of the complaint's current destination

### Why we chose Routing

We chose Routing because identifying the correct authority is a fundamental step between receiving a civic complaint and getting it to the appropriate department.

Our solution focuses specifically on making this routing process structured and location-aware while accounting for Mysuru's changing jurisdiction structure.

### What "solved" looks like for us

A citizen should be able to submit a complaint without needing to know which civic office is responsible.

The system should use the complaint's location and issue type to identify the applicable jurisdiction, authority and department, and provide a clear routing result.

---

## 2. Target Users & Mysuru Context

| User | Their situation | What they need from us |
|---|---|---|
| Resident / Citizen | May not know which authority is responsible for an issue at their location | Submit a complaint once and receive the appropriate routing information |
| MCC / Local Authority Officer | Receives complaints that may belong to different jurisdictions or departments | Clearly identify which authority and department should handle the complaint |
| Department / Field Worker | Needs location and issue information to understand where the complaint belongs | Receive structured complaint routing information |
| Project Administrator | Needs to maintain changing jurisdiction and routing information | Manage authorities, wards, localities, departments and routing rules |

### Local context we designed for

SAMAGRA MYSURU is designed around the specific civic and administrative context of Mysuru.

The system considers:

- The existing **65 MCC wards**
- The 2026 Greater Mysuru jurisdiction transition
- MCC and surrounding municipal, town panchayat and gram panchayat authorities
- Jurisdiction history and transition information
- Location-based routing
- Issue-category based routing
- GeoJSON geographical boundary information
- Structured authority and department information

The system is designed so that jurisdiction information can be updated as the administrative transition progresses.

---

## 3. Solution Overview

**SAMAGRA MYSURU** is a location-based civic complaint routing solution for Mysuru.

The system combines a complaint's location with its issue type to identify the applicable jurisdiction, responsible authority and relevant department. It uses structured 2026 Mysuru jurisdiction data, geographical boundary information and routing rules to support consistent complaint routing.

### Core flow

**Citizen does X**

The citizen submits a civic complaint with its location and issue type.

**System does Y**

The system identifies the geographical jurisdiction, determines the current operating authority and maps the issue to the appropriate department using routing rules.

**Staff does Z**

The responsible authority and department can use the routed complaint information for further action.

**Citizen sees outcome**

The citizen receives a clear indication of where the complaint has been routed.

### Main project components

- 2026 Mysuru jurisdiction database
- 65 MCC ward data
- Jurisdiction and locality information
- GeoJSON boundary data
- Authority and department mapping
- Issue categories
- Routing rules
- Jurisdiction history
- Complaint and routing-log structures

---

## 4. Architecture

SAMAGRA MYSURU uses geographical boundary data together with a structured MySQL routing database to map a civic complaint to its applicable jurisdiction, authority and department.

### Routing flow

```text
Citizen Complaint
       |
       v
Location + Issue Type
       |
       v
Geographical Jurisdiction
       |
       v
Current Operating Authority
       |
       v
Issue Category
       |
       v
Responsible Department
       |
       v
Routing Rule
       |
       v
Final Routing Result