# The Five Hard Constraints

[← Back to README](../README.md)

| # | Constraint | Status | Video |
|---|---|---|---|
| 1 | Fake, spam and harassment reports | ⚠️ Partial | — |
| 2 | Unclear jurisdiction | ✅ Handled | — |
| 3 | Prioritisation beyond "most votes" | ⚠️ Partial | — |
| 4 | Bad input (duplicate, fake photo, wrong location, abuse) | ⚠️ Partial | — |
| 5 | Works without internet | ⚠️ Partial | — |

---

## 1. Fake, spam and harassment reports

- **Approach:** The MVP focuses on validating complaint information and routing reports to the appropriate jurisdiction. Suspicious or abusive reports can be flagged for human review.
- **Anonymity trade-off:** The system should avoid unnecessarily exposing personal information while retaining enough information to identify repeated abuse when required.
- **Code:** Backend validation and complaint handling.

## 2. Unclear jurisdiction

- **Approach:** GPS coordinates are checked against available jurisdiction boundary data. A complaint that cannot be confidently mapped is sent to `Manual Review`.
- **What happens in a boundary case:** The system avoids making an unreliable assignment and uses manual review when the location falls outside or cannot be confidently matched to known boundaries.
- **Code:** `src/data/jurisdiction_boundaries.geojson` and jurisdiction routing logic.

## 3. Prioritisation

- **Formula / rules:** The MVP focuses on jurisdiction routing rather than ranking complaints only by the number of votes.
- **Why not simply "most votes":** Vote count alone can ignore severity, location and the urgency of a civic issue. A future version can combine severity, age, location and repeated reports.
- **Code:** Backend complaint/routing logic.

## 4. Bad input

| Input | What our system does |
|---|---|
| Duplicate report | Can be identified as a repeated complaint and handled by the backend workflow |
| Fake / unrelated photo | Requires additional image validation in a future version |
| Wrong or impossible location | Validates coordinates and sends unmappable locations to `Manual Review` |
| Abusive message | Can be flagged for human review |
| Missing location | Cannot be automatically routed and requires manual review |

## 5. Offline operation

- **What works offline:** The current MVP prioritises the routing and jurisdiction-data functionality. Full offline complaint submission is not yet guaranteed.
- **How it syncs:** A production version can use a local complaint queue with retry and synchronization when connectivity returns.
- **What does not work offline:** Backend API requests and real-time routing require network connectivity.
- **How to test:** The full offline workflow is planned as a future enhancement.