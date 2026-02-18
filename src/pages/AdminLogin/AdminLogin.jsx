import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./AdminLogin.css";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_ENDPOINT_URL = import.meta.env.VITE_API_URL;

  // ✅ DIRECT LOGIN (NO OTP)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const login_url = `${API_ENDPOINT_URL}api/login/`;

      const response = await axios.post(login_url, {
        username,
        password,
      });

      // ✅ store tokens
      if (response.status === 200 && response.data.access) {
        localStorage.setItem("accessToken", response.data.access);

        if (response.data.refresh) {
          localStorage.setItem("refreshToken", response.data.refresh);
        }

        // ✅ go to admin dashboard
        navigate("/sae-admin-dashboard");
      } else {
        setError("Invalid credentials.");
      }
    } catch (error) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginform">
      <div className="formcontain">
        <form onSubmit={handleLogin}>
          <label>
            <span
              style={{
                backgroundColor: "red",
                borderRadius: "1rem",
                color: "#fff",
                padding: "5px 10px",
              }}
            >
              Admin
            </span>{" "}
            <span style={{ color: "white" }}>Login</span>
          </label>

          <div style={{ position: "relative" }}>
            <FontAwesomeIcon
              icon={faUser}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            />
            <input
              type="text"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ paddingLeft: "35px" }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <FontAwesomeIcon
              icon={faLock}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            />
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingLeft: "35px" }}
            />
          </div>

          <button type="submit">Login</button>
        </form>

        {loading && <LoadingOverlay />}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div className="w-1/2 h-screen align-center flex items-center justify-center admin-img">
        <img
          className="lg:w-[600px] lg:h-[600px]"
          src="/Images/pngwing.com (7).png"
          alt=""
        />
      </div>
    </div>
  );
};

export default AdminLogin;