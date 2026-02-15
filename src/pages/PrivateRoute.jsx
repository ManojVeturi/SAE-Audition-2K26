import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // To track authentication status
  const navigate = useNavigate();
  const API_ENDPOINT_URL = import.meta.env.VITE_API_URL; // Ensure this is correctly set in .env

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/adminLogin");
        return;
      }

      try {
        const validate_url = `${API_ENDPOINT_URL}api/validate-token/`; // Use the env variable

        const response = await axios.get(validate_url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Token validation failed:", error.response?.data || error.message);
        setIsAuthenticated(false);
        navigate("/adminLogin");
      }
    };

    validateToken();
  }, [navigate, API_ENDPOINT_URL]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
