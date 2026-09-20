import { useState } from "react";
import AdminDashboard from "./AdminDashboard";

function AdminLogin({ back }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "admin123") {
            setLoggedIn(true);
        } else {
            alert("Invalid Username or Password");
        }
    };

    if (loggedIn) {
        return <AdminDashboard onHome={back} />;
    }

    return (
        <div className="admin-login-page">

            {/* Background overlay */}
            <div className="admin-background-overlay"></div>

            {/* Login Card */}
            <div className="admin-login-card">

                <div className="admin-login-icon">
                    🔐
                </div>

                <h1>Admin Portal</h1>

                <p className="admin-login-subtitle">
                    Authorized access only
                </p>

                <form onSubmit={handleLogin}>

                    {/* Username */}
                    <div className="input-group">
                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="input-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Login button */}
                    <button
                        type="submit"
                        className="admin-login-button"
                    >
                        Login
                    </button>

                </form>

                {/* Home button */}
                <button
                    type="button"
                    className="login-home-button"
                    onClick={back}
                >
                    🏠 Home
                </button>

                <p className="admin-login-footer">
                    Samagra Mysuru • Civic Governance System
                </p>

            </div>

            <style>{`

                /* =========================================
                   ADMIN LOGIN PAGE
                   ========================================= */

                .admin-login-page {
                    min-height: 100vh;
                    width: 100%;

                    background-image: url('/admin background.jpg');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    position: relative;
                    overflow: hidden;
                }


                /* =========================================
                   BACKGROUND OVERLAY
                   ========================================= */

                .admin-background-overlay {
                    position: absolute;
                    inset: 0;

                    background: rgba(0, 0, 0, 0.30);

                    z-index: 0;
                }


                /* =========================================
                   LOGIN CARD
                   ========================================= */

                .admin-login-card {
                    position: relative;
                    z-index: 1;

                    width: min(420px, calc(100% - 40px));

                    padding: 40px;

                    border-radius: 24px;

                    background: rgba(255, 255, 255, 0.78);

                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);

                    border: none;

                    box-shadow:
                        0 20px 50px rgba(0, 0, 0, 0.25);

                    text-align: center;
                }


                /* =========================================
                   LOGIN ICON
                   ========================================= */

                .admin-login-icon {
                    width: 70px;
                    height: 70px;

                    margin: 0 auto 18px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: rgba(255, 255, 255, 0.85);

                    font-size: 32px;

                    box-shadow:
                        0 8px 20px rgba(0, 0, 0, 0.12);
                }


                /* =========================================
                   TITLE
                   ========================================= */

                .admin-login-card h1 {
                    margin: 0;

                    color: #234d32;

                    font-size: 30px;
                    font-weight: 800;
                }


                .admin-login-subtitle {
                    margin: 8px 0 30px;

                    color: #52645a;

                    font-size: 14px;
                }


                /* =========================================
                   INPUT GROUP
                   ========================================= */

                .input-group {
                    text-align: left;

                    margin-bottom: 20px;
                }


                .input-group label {
                    display: block;

                    margin-bottom: 7px;

                    color: #294d35;

                    font-size: 14px;
                    font-weight: 700;
                }


                .input-group input {
                    width: 100%;

                    box-sizing: border-box;

                    padding: 13px 15px;

                    border: 1px solid rgba(70, 100, 80, 0.25);

                    border-radius: 10px;

                    background: rgba(255, 255, 255, 0.90);

                    color: #26382c;

                    font-size: 14px;

                    outline: none;

                    transition:
                        border-color 0.2s ease,
                        box-shadow 0.2s ease;
                }


                .input-group input:focus {
                    border-color: #4d805b;

                    box-shadow:
                        0 0 0 3px rgba(77, 128, 91, 0.15);
                }


                .input-group input::placeholder {
                    color: #87928a;
                }


                /* =========================================
                   LOGIN BUTTON
                   ========================================= */

                .admin-login-button {
                    width: 100%;

                    padding: 14px;

                    margin-top: 5px;

                    border: none;

                    border-radius: 10px;

                    background: #315f3d;

                    color: white;

                    font-size: 15px;
                    font-weight: 700;

                    cursor: pointer;

                    transition:
                        transform 0.2s ease,
                        background 0.2s ease,
                        box-shadow 0.2s ease;
                }


                .admin-login-button:hover {
                    background: #244b2f;

                    transform: translateY(-1px);

                    box-shadow:
                        0 8px 18px rgba(49, 95, 61, 0.25);
                }


                /* =========================================
                   HOME BUTTON
                   ========================================= */

                .login-home-button {
                    width: 100%;

                    margin-top: 14px;

                    padding: 12px;

                    border: 1px solid rgba(49, 95, 61, 0.25);

                    border-radius: 10px;

                    background: rgba(255, 255, 255, 0.65);

                    color: #315f3d;

                    font-size: 14px;
                    font-weight: 700;

                    cursor: pointer;

                    transition:
                        background 0.2s ease,
                        transform 0.2s ease;
                }


                .login-home-button:hover {
                    background: rgba(255, 255, 255, 0.90);

                    transform: translateY(-1px);
                }


                /* =========================================
                   FOOTER
                   ========================================= */

                .admin-login-footer {
                    margin: 25px 0 0;

                    color: #65736a;

                    font-size: 11px;
                }


                /* =========================================
                   MOBILE
                   ========================================= */

                @media (max-width: 600px) {

                    .admin-login-card {
                        padding: 30px 24px;

                        border-radius: 20px;
                    }

                    .admin-login-card h1 {
                        font-size: 26px;
                    }

                }

            `}</style>

        </div>
    );
}

export default AdminLogin;