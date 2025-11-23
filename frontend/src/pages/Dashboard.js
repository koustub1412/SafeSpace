import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPhoneAlt,
  FaHome,
  FaExclamationTriangle,
  FaMapMarkedAlt,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={wrapper}>

      {/* FIXED LOGOUT BUTTON */}
      <button onClick={handleLogout} style={logoutBtn}>
        Logout
      </button>

      <h1 style={title}>Welcome to SafeSpace</h1>

      <div style={grid}>
        <div style={tile} onClick={() => navigate("/dashboard")}>
          <FaHome size={40} />
          <p style={tileLabel}>Home</p>
        </div>

        <div style={tile} onClick={() => navigate("/contacts")}>
          <FaPhoneAlt size={40} />
          <p style={tileLabel}>Contacts</p>
        </div>

        <div style={tile} onClick={() => navigate("/sos")}>
          <FaExclamationTriangle size={40} />
          <p style={tileLabel}>SOS</p>
        </div>

        <div style={tile} onClick={() => navigate("/map")}>
          <FaMapMarkedAlt size={40} />
          <p style={tileLabel}>Map</p>
        </div>
      </div>
    </div>
  );
}

/* FIXED WRAPPER */
const wrapper = {
  minHeight: "100vh",
  width: "100%",
  background: "#000",
  padding: "20px",
  color: "white",
  position: "relative",
};

/* FIXED LOGOUT BUTTON (VISIBLE) */
const logoutBtn = {
  position: "fixed",
  top: "20px",
  right: "20px",
  zIndex: 99999,
  background: "linear-gradient(135deg,#ff5f6d,#ffc371)",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 0 15px rgba(255,95,109,0.3)",
};

/* TITLE */
const title = {
  color: "#ff5f6d",
  marginTop: "80px",   // Now placed BELOW logout button spacing
  marginBottom: "30px",
  fontSize: "28px",
  fontWeight: "700",
};

/* GRID */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "18px",
};

/* GRID TILE */
const tile = {
  background: "rgba(50, 50, 50, 0.5)",
  border: "1px solid rgba(255, 95, 109, 0.2)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: "40px 20px",
  textAlign: "center",
  color: "white",
  cursor: "pointer",
  transition: "0.2s ease",
};

/* LABEL */
const tileLabel = {
  marginTop: "12px",
  fontSize: "16px",
  fontWeight: "600",
};

export default Dashboard;
