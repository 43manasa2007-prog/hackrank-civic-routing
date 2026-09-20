# Architecture

[← Back to README](../README.md)

## System Diagram

```mermaid
flowchart LR
    A[Citizen / Complaint Input] --> B[Backend API]
    B --> C[Complaint Validation]
    C --> D[Jurisdiction Routing]
    D --> E[(Jurisdiction Data)]
    E --> D
    D --> F[Responsible Jurisdiction]
    D --> G[Manual Review]
    B --> H[Complaint Status / Response]

    F --> H
    G --> H