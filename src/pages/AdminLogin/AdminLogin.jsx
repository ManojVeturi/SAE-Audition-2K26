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
  const [otp, setOtp] = useState(""); //saeindia@nitdgp.ac.in
  const [email, setEmail] = useState(import.meta.env.VITE_EMAIL); // saeindia@nitdgp.ac.in
  const [error, setError] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false); // To track OTP sent status
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const API_ENDPOINT_URL = import.meta.env.VITE_API_URL;
  const [token, setToken] = useState(null);

  // Function to handle sending OTP
  const sendOtp = async (token) => {
    setLoading(true);
    try {
      const send_otp_url = `${API_ENDPOINT_URL}api/send-otp/`;
      const response = await axios.post(
        send_otp_url,
        { email },
        
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setIsOtpSent(true);
      } else {
        setError("Failed to send OTP.");
      }
    } catch (error) {
      setError("Error sending OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const login_url = `${API_ENDPOINT_URL}api/login/`;
      const response = await axios.post(login_url, { username, password });
  
      if (response.status === 200 && response.data.access) {
        setToken(response.data.access);
        await sendOtp(response.data.access);
      } else {
        setError("Invalid credentials.");
      }
    } catch (error) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      // const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Session expired. Please log in again.");
        setIsOtpSent(false);
        return;
      }
  
      const verify_otp_url = `${API_ENDPOINT_URL}api/verify-otp/`;
      const response = await axios.post(
        verify_otp_url,
        { email, otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        localStorage.setItem("accessToken", token);
        // console.log(token);
        setTimeout(() => {
          navigate("/sae-admin-dashboard");
        }, 500);
      } else {
        setError("Invalid OTP.");
      }
    } catch (error) {
      setError("Invalid OTP or expired session.");
    } finally {
      setLoading(false);
    }
  };
  console.log("API URL =", API_ENDPOINT_URL);
  console.log("API URL =", import.meta.env.VITE_API_URL);


 
  return (
    
    <div className="loginform">
      <div className="formcontain">
        {!isOtpSent ? (
          <form onSubmit={handleLogin}>
            <label>
              <span style={{ backgroundColor: "red", borderRadius: "1rem", color: "#fff", padding: "5px 10px" }}>
                Admin
              </span>{" "}
              <span style={{ color: "white" }}>Login</span>
            </label>

            <div style={{ position: "relative" }}>
              <FontAwesomeIcon icon={faUser} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
              <input type="text" value={username} placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} required style={{ paddingLeft: "35px" }} />
            </div>

            <div style={{ position: "relative" }}>
              <FontAwesomeIcon icon={faLock} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
              <input type="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required style={{ paddingLeft: "35px" }} />
            </div>

            <button type="submit">Send OTP</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <input placeholder="Enter OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <button type="submit">Submit OTP</button>
          </form>
        )}

        {loading && <LoadingOverlay />}
        {error && <p style={{ color: "red"}}>{error}</p>}
      </div>

      <div className="w-1/2 h-screen align-center flex items-center justify-center admin-img">
        <img className="lg:w-[600px] lg:h-[600px]" src="/Images/pngwing.com (7).png" alt="" />
      </div>
    </div>
  );
};

export default AdminLogin;