import { useState } from "react";
import UserApp from "./UserApp";
import AdminLogin from "./admin/Pages/AdminLogin";

function Home({ onCitizen, onAdmin }) {
  return (
    <div className="portal-home">
      <div className="portal-overlay">
        <div className="portal-card">

          <div className="portal-icon">
            🏛️
          </div>

          <h1>Samagra Mysuru</h1>

          <p className="portal-subtitle">
            Civic Complaint & Governance Portal
          </p>

          <p className="portal-description">
            Welcome to the Mysuru civic governance portal.
            Choose your portal below.
          </p>

          <div className="portal-buttons">

            <button
              type="button"
              className="portal-button citizen-button"
              onClick={onCitizen}
            >
              <span className="button-title">
                Citizen Portal
              </span>

              <span className="button-description">
                Report a civic complaint
              </span>
            </button>

            <button
              type="button"
              className="portal-button admin-button"
              onClick={onAdmin}
            >
              <span className="button-title">
                Admin Portal
              </span>

              <span className="button-description">
                Manage civic complaints
              </span>
            </button>

          </div>

        </div>
      </div>

      <style>{`
        .portal-home {
          min-height: 100vh;
          background-image: url('/mysuru-corporation.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .portal-overlay {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.45);
          padding: 30px;
          box-sizing: border-box;
        }

        .portal-card {
          width: min(680px, 100%);
          box-sizing: border-box;
          padding: 48px 40px;
          text-align: center;
          background: rgba(255, 255, 255, 0.96);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
        }

        .portal-icon {
          font-size: 52px;
          margin-bottom: 10px;
        }

        .portal-card h1 {
          margin: 0;
          font-size: 42px;
          color: #173f2a;
        }

        .portal-subtitle {
          margin: 10px 0 0;
          font-size: 21px;
          font-weight: 600;
          color: #39734a;
        }

        .portal-description {
          margin: 16px auto 32px;
          max-width: 500px;
          color: #555;
          font-size: 16px;
          line-height: 1.6;
        }

        .portal-buttons {
          display: flex;
          justify-content: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .portal-button {
          width: 250px;
          min-height: 125px;
          border: none;
          border-radius: 14px;
          padding: 22px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .portal-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
        }

        .citizen-button {
          background: #e8f4ea;
          color: #205c32;
        }

        .admin-button {
          background: #edf0f5;
          color: #26384d;
        }

        .button-title {
          font-size: 20px;
          font-weight: 700;
        }

        .button-description {
          font-size: 14px;
          opacity: 0.8;
        }

        @media (max-width: 600px) {
          .portal-card {
            padding: 35px 20px;
          }

          .portal-card h1 {
            font-size: 32px;
          }

          .portal-subtitle {
            font-size: 18px;
          }

          .portal-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");

  // HOME → CITIZEN PORTAL
  if (page === "citizen") {
    return (
      <UserApp
        back={() => setPage("home")}
      />
    );
  }

  // HOME → ADMIN PORTAL
  if (page === "admin") {
    return (
      <AdminLogin
        back={() => setPage("home")}
      />
    );
  }

  // MAIN HOME PAGE
  return (
    <Home
      onCitizen={() => setPage("citizen")}
      onAdmin={() => setPage("admin")}
    />
  );
}

export default App;