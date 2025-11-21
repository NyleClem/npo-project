import { NavLink } from "react-router-dom";
import Logo from "../assets/MaadScienceLogo.png";

const NavBar = () => {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        borderBottom: "1px solid #e5e5e5",
        background: "#ffffff"
      }}
    >
      {/* Left Section - Logo and Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <img
          src={Logo}
          alt="MaadScience Logo"
          style={{
            width: "90px",
            height: "auto",
            objectFit: "contain"
          }}
        />
        <span style={{ fontSize: "1.25rem", fontWeight: 600 }}>
          NFL Personnel Optimizer
        </span>
      </div>

      {/* Right Section - Links */}
      <div style={{ display: "flex", gap: "24px" }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#007bff" : "#333",
            textDecoration: isActive ? "underline" : "none",
            fontSize: "1rem"
          })}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/upload"
          style={({ isActive }) => ({
            color: isActive ? "#007bff" : "#333",
            textDecoration: isActive ? "underline" : "none",
            fontSize: "1rem"
          })}
        >
          Upload Data
        </NavLink>

        <NavLink
          to="/view"
          style={({ isActive }) => ({
            color: isActive ? "#007bff" : "#333",
            textDecoration: isActive ? "underline" : "none",
            fontSize: "1rem"
          })}
        >
          View Data
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;