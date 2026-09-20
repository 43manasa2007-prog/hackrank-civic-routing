# Known Limitations & Future Scope

[← Back to README](../README.md)

## What Doesn't Work Yet

| Limitation | Why it exists | What we'd do next |
|---|---|---|
| Boundary data is currently limited to demo jurisdiction areas | Official and complete GIS boundary data was not available within the 72-hour hackathon period | Integrate verified MCC, Mysuru district and KGIS boundary data |
| Real-time complaint status is limited in the MVP | The hackathon MVP focuses mainly on complaint routing and jurisdiction detection | Connect the system with official department workflows and status updates |
| Manual Review is required for locations outside known boundaries | The system should not incorrectly assign a complaint when the location cannot be confidently mapped | Add more jurisdiction boundaries and improve boundary coverage |

## Edge Cases We Don't Handle

- GPS spoofing or inaccurate GPS coordinates from the user's device
- Locations outside the currently available jurisdiction boundary data
- Multiple complaints submitted for the same issue
- Temporary changes in jurisdiction that are not yet present in the data
- Network interruptions while submitting a complaint

## Scaling to All of Mysuru

<!-- Expands Decision Log Q3. Keep the two consistent. -->

| What breaks first | Rough numbers | Fix |
|---|---|---|
| Jurisdiction boundary data coverage | All wards and surrounding Panchayat areas | Integrate complete verified GIS boundary datasets |
| Backend routing requests | Increasing number of simultaneous complaints | Add database optimization, caching and scalable backend deployment |
| Complaint tracking and storage | Large number of complaints over time | Use a production database with indexing and archival |

## Roadmap

1. Pilot the system with selected MCC and Panchayat areas
2. Integrate verified Mysuru jurisdiction and GIS boundary data
3. Add Kannada voice-based complaint reporting
4. Add real-time complaint status and notifications
5. Expand routing coverage to all Mysuru wards and relevant Panchayat areas
6. Add analytics dashboard for authorities to identify recurring civic issues