import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="saeNav">
      <div className="nav-logo-container">
        <img
          src="https://i.ibb.co/fvZpdy8/SAE-Logo-White-3x.png"
          alt="SAE Logo"
          className="nav-logo"
        />
      </div>

      <button
        className="open-sidebar-button"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div
        ref={sidebarRef}
        className={`nav-links-container ${isSidebarOpen ? "open" : ""}`}
      >
        <button
          className="close-sidebar-button"
          onClick={toggleSidebar}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navlink active" : "navlink"
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/aboutSae"
          className={({ isActive }) =>
            isActive ? "navlink active" : "navlink"
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          About SAE
        </NavLink>
        <NavLink
          to="/googleAuth"
          className={({ isActive }) =>
            isActive ? "navlink active" : "navlink"
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          Register
        </NavLink>
        <NavLink
          to="/adminlogin"
          className={({ isActive }) =>
            isActive ? "navlink active" : "navlink"
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          Admin login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
