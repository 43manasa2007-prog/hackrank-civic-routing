import { useEffect, useMemo, useState } from "react";
import "../styles/AdminDashboard.css";

const API_URL = "http://10.26.169.223:8000";

function AdminDashboard({ onLogout }) {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    /*
     * Convert the backend complaint into the format
     * already expected by your existing dashboard UI.
     */
    const normalizeComplaint = (item) => {
        return {
            id: item.complaint_id ?? item.id,

            name:
                item.name ??
                item.citizen_name ??
                item.user_name ??
                "Citizen",

            phone:
                item.phone ??
                item.phone_number ??
                item.mobile ??
                "Not available",

            issue:
                item.issue_type ??
                item.issue ??
                item.description ??
                "Complaint",

            description:
                item.description ??
                item.issue_type ??
                "No description available.",

            photo:
                item.photo ??
                item.photo_url ??
                null,

            video:
                item.video ??
                item.video_url ??
                null,

            latitude:
                item.latitude ??
                "",

            longitude:
                item.longitude ??
                "",

            accuracy:
                item.accuracy ??
                item.gps_accuracy ??
                "Not available",

            complaintDate:
                item.complaint_date ??
                item.created_at ??
                "Not available",

            authority:
                item.authority_name ??
                item.authority ??
                "Not assigned",

            authorityShort:
                item.authority_type ??
                item.authority_short ??
                "Not assigned",

            jurisdiction:
                item.jurisdiction_id ??
                item.jurisdiction ??
                "Not assigned",

            status:
                item.status ??
                "New",

            confidence:
                item.confidence ??
                item.routing_confidence ??
                null,

            reason:
                item.reason ??
                item.jurisdiction_reason ??
                ""
        };
    };

    /*
     * Get real complaints from FastAPI/MySQL.
     */
    const loadComplaints = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/complaints`
            );

            if (!response.ok) {
                throw new Error(
                    `Backend returned ${response.status}`
                );
            }

            const data = await response.json();

            /*
             * Backend may return:
             *   [ ... ]
             *
             * or:
             *   { complaints: [ ... ] }
             *
             * or:
             *   { data: [ ... ] }
             */
            const complaintList =
                Array.isArray(data)
                    ? data
                    : data.complaints ??
                    data.data ??
                    [];

            const normalized = complaintList.map(
                normalizeComplaint
            );

            setComplaints(normalized);

        } catch (err) {
            console.error(
                "Failed to load complaints:",
                err
            );

            setError(
                "Unable to load complaints from the backend."
            );

        } finally {
            setLoading(false);
        }
    };

    /*
     * Load complaints when Admin Dashboard opens.
     */
    useEffect(() => {
        loadComplaints();

        /*
         * Refresh every 5 seconds.
         * Therefore, when a citizen submits a complaint,
         * the admin dashboard can receive it automatically.
         */
        const interval = setInterval(
            loadComplaints,
            5000
        );

        return () => clearInterval(interval);
    }, []);

    /*
     * Statistics are calculated from REAL complaints.
     */
    const totalComplaints = complaints.length;

    const newComplaints = complaints.filter(
        (complaint) =>
            complaint.status === "New"
    ).length;

    const inProgressComplaints = complaints.filter(
        (complaint) =>
            complaint.status === "In Progress"
    ).length;

    const resolvedComplaints = complaints.filter(
        (complaint) =>
            complaint.status === "Resolved"
    ).length;

    /*
     * Authority summary from REAL complaints.
     */
    const authoritySummary = useMemo(() => {
        const summary = {};

        complaints.forEach((complaint) => {
            const authority =
                complaint.authority ||
                "Not assigned";

            if (!summary[authority]) {
                summary[authority] = {
                    name: authority,
                    short:
                        complaint.authorityShort ||
                        "Not assigned",
                    count: 0
                };
            }

            summary[authority].count += 1;
        });

        return Object.values(summary);
    }, [complaints]);

    /*
     * Total Complaints card can be clicked.
     *
     * Clicking it shows ALL complaints.
     */
    const filteredComplaints = useMemo(() => {
        if (activeFilter === "all") {
            return complaints;
        }

        return complaints.filter(
            (complaint) =>
                complaint.status === activeFilter
        );
    }, [complaints, activeFilter]);

    /*
     * Status update is currently local to the dashboard.
     *
     * IMPORTANT:
     * For status to persist in MySQL, we will later add
     * a PUT/PATCH backend endpoint.
     */
    const updateStatus = (
        complaintId,
        newStatus
    ) => {
        setComplaints((current) =>
            current.map((complaint) =>
                complaint.id === complaintId
                    ? {
                        ...complaint,
                        status: newStatus
                    }
                    : complaint
            )
        );

        setSelectedComplaint((current) =>
            current &&
                current.id === complaintId
                ? {
                    ...current,
                    status: newStatus
                }
                : current
        );
    };

    const getStatusClass = (status) => {
        if (status === "New") {
            return "status-new";
        }

        if (status === "Assigned") {
            return "status-assigned";
        }

        if (status === "In Progress") {
            return "status-progress";
        }

        if (status === "Resolved") {
            return "status-resolved";
        }

        return "";
    };

    return (
        <div className="admin-dashboard">

            {/* HEADER */}
            <header className="dashboard-header">

                <div className="dashboard-brand">

                    <div className="dashboard-icon">
                        🏛️
                    </div>

                    <div>
                        <h1>Samagra Mysuru</h1>

                        <p>
                            Civic Governance & Smart Routing
                        </p>
                    </div>

                </div>

                <div className="dashboard-header-actions">

                    <div className="admin-badge">
                        🔐 Authorized Admin
                    </div>

                    <button
                        type="button"
                        className="logout-button"
                        onClick={onLogout}
                    >
                        🚪 Logout
                    </button>

                </div>

            </header>


            {/* PAGE TITLE */}
            <section className="dashboard-title">

                <p className="dashboard-eyebrow">
                    ADMINISTRATION
                </p>

                <h2>
                    Admin Dashboard
                </h2>

                <p>
                    Monitor civic complaints, routing
                    decisions and responsible authorities.
                </p>

            </section>


            {/* ERROR */}
            {error && (
                <section className="dashboard-section">
                    <div className="section-heading">
                        <h3>Backend Connection</h3>
                    </div>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={loadComplaints}
                    >
                        Retry
                    </button>
                </section>
            )}


            {/* STATISTICS */}
            <section className="dashboard-section">

                <div className="section-heading">

                    <h3>
                        Complaint Overview
                    </h3>

                    <span>
                        Live data from database
                    </span>

                </div>


                <div className="cards">

                    {/* TOTAL */}
                    <button
                        type="button"
                        className="stat-card"
                        onClick={() => {
                            setActiveFilter("all");

                            setTimeout(() => {
                                document
                                    .getElementById(
                                        "recent-complaints"
                                    )
                                    ?.scrollIntoView({
                                        behavior:
                                            "smooth"
                                    });
                            }, 50);
                        }}
                    >

                        <div className="stat-icon">
                            📋
                        </div>

                        <div>
                            <p>
                                Total Complaints
                            </p>

                            <h3>
                                {loading
                                    ? "..."
                                    : totalComplaints}
                            </h3>
                        </div>

                    </button>


                    {/* NEW */}
                    <button
                        type="button"
                        className="stat-card"
                        onClick={() => {
                            setActiveFilter("New");

                            setTimeout(() => {
                                document
                                    .getElementById(
                                        "recent-complaints"
                                    )
                                    ?.scrollIntoView({
                                        behavior:
                                            "smooth"
                                    });
                            }, 50);
                        }}
                    >

                        <div className="stat-icon">
                            🆕
                        </div>

                        <div>
                            <p>
                                New Complaints
                            </p>

                            <h3>
                                {loading
                                    ? "..."
                                    : newComplaints}
                            </h3>
                        </div>

                    </button>


                    {/* IN PROGRESS */}
                    <button
                        type="button"
                        className="stat-card"
                        onClick={() => {
                            setActiveFilter(
                                "In Progress"
                            );

                            setTimeout(() => {
                                document
                                    .getElementById(
                                        "recent-complaints"
                                    )
                                    ?.scrollIntoView({
                                        behavior:
                                            "smooth"
                                    });
                            }, 50);
                        }}
                    >

                        <div className="stat-icon">
                            🔄
                        </div>

                        <div>
                            <p>
                                In Progress
                            </p>

                            <h3>
                                {loading
                                    ? "..."
                                    : inProgressComplaints}
                            </h3>
                        </div>

                    </button>


                    {/* RESOLVED */}
                    <button
                        type="button"
                        className="stat-card"
                        onClick={() => {
                            setActiveFilter(
                                "Resolved"
                            );

                            setTimeout(() => {
                                document
                                    .getElementById(
                                        "recent-complaints"
                                    )
                                    ?.scrollIntoView({
                                        behavior:
                                            "smooth"
                                    });
                            }, 50);
                        }}
                    >

                        <div className="stat-icon">
                            ✓
                        </div>

                        <div>
                            <p>
                                Resolved
                            </p>

                            <h3>
                                {loading
                                    ? "..."
                                    : resolvedComplaints}
                            </h3>
                        </div>

                    </button>

                </div>

            </section>


            {/* AUTHORITY SUMMARY */}
            <section className="dashboard-section">

                <div className="section-heading">

                    <h3>
                        Authority Summary
                    </h3>

                    <span>
                        Based on current complaints
                    </span>

                </div>


                <div className="table-container">

                    <table className="admin-table">

                        <thead>

                            <tr>
                                <th>
                                    Authority
                                </th>

                                <th>
                                    Complaints
                                </th>
                            </tr>

                        </thead>

                        <tbody>

                            {authoritySummary.length ===
                                0 ? (

                                <tr>
                                    <td colSpan="2">
                                        No complaints
                                        available.
                                    </td>
                                </tr>

                            ) : (

                                authoritySummary.map(
                                    (authority) => (

                                        <tr
                                            key={
                                                authority.name
                                            }
                                        >

                                            <td>

                                                <span className="authority-name">
                                                    {
                                                        authority.name
                                                    }
                                                </span>

                                                <small>
                                                    {
                                                        authority.short
                                                    }
                                                </small>

                                            </td>

                                            <td>
                                                <strong>
                                                    {
                                                        authority.count
                                                    }
                                                </strong>
                                            </td>

                                        </tr>
                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </section>


            {/* RECENT COMPLAINTS */}
            <section
                className="dashboard-section"
                id="recent-complaints"
            >

                <div className="section-heading">

                    <div>

                        <h3>
                            Complaints
                        </h3>

                        <span>
                            Live citizen submissions
                        </span>

                    </div>

                    <button
                        type="button"
                        onClick={loadComplaints}
                    >
                        🔄 Refresh
                    </button>

                </div>


                {/* FILTER MESSAGE */}
                {activeFilter !== "all" && (

                    <div>
                        Showing:
                        {" "}
                        <strong>
                            {activeFilter}
                        </strong>

                        {" "}

                        <button
                            type="button"
                            onClick={() =>
                                setActiveFilter(
                                    "all"
                                )
                            }
                        >
                            Show All
                        </button>
                    </div>

                )}


                <div className="table-container">

                    <table className="admin-table">

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Citizen
                                </th>

                                <th>
                                    Issue
                                </th>

                                <th>
                                    Authority
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                    >
                                        Loading complaints
                                        from database...
                                    </td>

                                </tr>

                            ) : filteredComplaints.length ===
                                0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                    >
                                        No complaints
                                        available.
                                    </td>

                                </tr>

                            ) : (

                                filteredComplaints.map(
                                    (complaint) => (

                                        <tr
                                            key={
                                                complaint.id
                                            }
                                        >

                                            <td>
                                                #
                                                {
                                                    complaint.id
                                                }
                                            </td>


                                            <td>

                                                <span className="issue-name">
                                                    {
                                                        complaint.name
                                                    }
                                                </span>

                                                <small>
                                                    {
                                                        complaint.phone
                                                    }
                                                </small>

                                            </td>


                                            <td>
                                                {
                                                    complaint.issue
                                                }
                                            </td>


                                            <td>
                                                {
                                                    complaint.authorityShort
                                                }
                                            </td>


                                            <td>

                                                <span
                                                    className={`status-badge ${getStatusClass(
                                                        complaint.status
                                                    )}`}
                                                >
                                                    {
                                                        complaint.status
                                                    }
                                                </span>

                                            </td>


                                            <td>

                                                <button
                                                    type="button"
                                                    className="view-details-button"
                                                    onClick={() =>
                                                        setSelectedComplaint(
                                                            complaint
                                                        )
                                                    }
                                                >
                                                    View Details
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </section>


            {/* COMPLAINT DETAILS MODAL */}
            {selectedComplaint && (

                <div
                    className="complaint-modal-overlay"
                    onClick={() =>
                        setSelectedComplaint(
                            null
                        )
                    }
                >

                    <div
                        className="complaint-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="complaint-modal-header">

                            <div>

                                <span className="modal-label">
                                    COMPLAINT #
                                    {
                                        selectedComplaint.id
                                    }
                                </span>

                                <h2>
                                    {
                                        selectedComplaint.issue
                                    }
                                </h2>

                                <p>
                                    Complete complaint
                                    information
                                </p>

                            </div>

                            <button
                                type="button"
                                className="close-modal-button"
                                onClick={() =>
                                    setSelectedComplaint(
                                        null
                                    )
                                }
                            >
                                ×
                            </button>

                        </div>


                        <div className="complaint-modal-content">

                            {/* CITIZEN */}
                            <div className="detail-card">

                                <h3>
                                    👤 Citizen Information
                                </h3>

                                <div className="detail-item">
                                    <span>
                                        Name
                                    </span>

                                    <strong>
                                        {
                                            selectedComplaint.name
                                        }
                                    </strong>
                                </div>

                                <div className="detail-item">
                                    <span>
                                        Phone Number
                                    </span>

                                    <strong>
                                        {
                                            selectedComplaint.phone
                                        }
                                    </strong>
                                </div>

                            </div>


                            {/* COMPLAINT */}
                            <div className="detail-card">

                                <h3>
                                    📝 Complaint Information
                                </h3>

                                <div className="detail-item">

                                    <span>
                                        Issue
                                    </span>

                                    <strong>
                                        {
                                            selectedComplaint.issue
                                        }
                                    </strong>

                                </div>


                                <div className="description-area">

                                    <span>
                                        Problem Description
                                    </span>

                                    <p>
                                        {
                                            selectedComplaint.description
                                        }
                                    </p>

                                </div>

                            </div>


                            {/* LOCATION */}
                            <div className="detail-card">

                                <h3>
                                    📍 GPS Location
                                </h3>

                                <div className="detail-item">

                                    <span>
                                        Latitude
                                    </span>

                                    <strong>
                                        {
                                            selectedComplaint.latitude
                                        }
                                    </strong>

                                </div>


                                <div className="detail-item">

                                    <span>
                                        Longitude
                                    </span>

                                    <strong>
                                        {
                                            selectedComplaint.longitude
                                        }
                                    </strong>

                                </div>


                                <div className="detail-item">

                                    <span>
                                        GPS Accuracy
                                    </span>

                                    <strong>
                                        {
                                            selectedComplaint.accuracy
                                        }
                                    </strong>

                                </div>


                                {selectedComplaint.latitude &&
                                    selectedComplaint.longitude && (

                                        <a
                                            className="map-button"
                                            href={`https://www.google.com/maps?q=${selectedComplaint.latitude},${selectedComplaint.longitude}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            🗺️ Open Location in Google Maps
                                        </a>

                                    )}

                            </div>


                            {/* ROUTING */}
                            <div className="detail-card">

                                <h3>
                                    🏛️ Routing Information
                                </h3>

                                <div className="detail-item">

                                    <span>
                                        Responsible Authority
                                    </span>

                                    <strong>
                                        {
                                            selectedComplaint.authority
                                        }
                                    </strong>

                                </div>


                                <div className="detail-item">

                                    <span>
                                        Authority Type
                                    </span>

                                    <strong>
                                        {
                                            selectedComplaint.authorityShort
                                        }
                                    </strong>

                                </div>


                                <div className="detail-item">

                                    <span>
                                        Jurisdiction
                                    </span>

                                    <strong>
                                        {
                                            selectedComplaint.jurisdiction
                                        }
                                    </strong>

                                </div>


                                {selectedComplaint.confidence !==
                                    null && (

                                        <div className="detail-item">

                                            <span>
                                                Routing Confidence
                                            </span>

                                            <strong>
                                                {
                                                    selectedComplaint.confidence
                                                }
                                            </strong>

                                        </div>

                                    )}

                            </div>


                            {/* DATE / STATUS */}
                            <div className="detail-card">

                                <h3>
                                    📅 Complaint Information
                                </h3>

                                <div className="detail-item">

                                    <span>
                                        Complaint Date
                                    </span>

                                    <strong>
                                        {
                                            selectedComplaint.complaintDate
                                        }
                                    </strong>

                                </div>


                                <div className="detail-item">

                                    <span>
                                        Current Status
                                    </span>

                                    <strong>
                                        {
                                            selectedComplaint.status
                                        }
                                    </strong>

                                </div>

                            </div>


                            {/* PHOTO */}
                            <div className="detail-card media-card">

                                <h3>
                                    📷 Complaint Photo
                                </h3>

                                {selectedComplaint.photo ? (

                                    <img
                                        src={
                                            selectedComplaint.photo
                                        }
                                        alt="Complaint evidence"
                                        className="complaint-photo"
                                    />

                                ) : (

                                    <div className="no-media">
                                        No complaint photo
                                        available yet.
                                    </div>

                                )}

                            </div>


                            {/* VIDEO */}
                            <div className="detail-card media-card">

                                <h3>
                                    🎥 Complaint Video
                                </h3>

                                {selectedComplaint.video ? (

                                    <video
                                        src={
                                            selectedComplaint.video
                                        }
                                        controls
                                        className="complaint-video"
                                    />

                                ) : (

                                    <div className="no-media">
                                        No complaint video
                                        available yet.
                                    </div>

                                )}

                            </div>


                            {/* STATUS */}
                            <div className="status-update-card">

                                <h3>
                                    🔄 Update Complaint Status
                                </h3>

                                <p>
                                    Admin can update the progress
                                    of this civic complaint.
                                </p>


                                <div className="status-buttons">

                                    <button
                                        type="button"
                                        className="status-action-button status-action-new"
                                        onClick={() =>
                                            updateStatus(
                                                selectedComplaint.id,
                                                "New"
                                            )
                                        }
                                    >
                                        New
                                    </button>


                                    <button
                                        type="button"
                                        className="status-action-button status-action-progress"
                                        onClick={() =>
                                            updateStatus(
                                                selectedComplaint.id,
                                                "In Progress"
                                            )
                                        }
                                    >
                                        In Progress
                                    </button>


                                    <button
                                        type="button"
                                        className="status-action-button status-action-resolved"
                                        onClick={() =>
                                            updateStatus(
                                                selectedComplaint.id,
                                                "Resolved"
                                            )
                                        }
                                    >
                                        Resolved
                                    </button>

                                </div>

                            </div>

                        </div>


                        <div className="complaint-modal-footer">

                            <button
                                type="button"
                                className="close-details-button"
                                onClick={() =>
                                    setSelectedComplaint(
                                        null
                                    )
                                }
                            >
                                Close Details
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* FOOTER */}
            <footer className="dashboard-footer">

                <span>
                    Samagra Mysuru
                </span>

                <span>
                    HackMysuru 1.0 • Phase 1 MVP
                </span>

            </footer>

        </div>
    );
}

export default AdminDashboard;