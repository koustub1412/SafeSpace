import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaPhoneAlt, FaMapMarkedAlt, FaExclamationTriangle } from "react-icons/fa";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <FaHome />, path: "/dashboard", label: "Home" },
    { icon: <FaPhoneAlt />, path: "/contacts", label: "Contacts" },
    { icon: <FaExclamationTriangle />, path: "/sos", label: "SOS" },
    { icon: <FaMapMarkedAlt />, path: "/map", label: "Map" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        display: "flex",
        justifyContent: "space-around",
        padding: "15px 0",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {navItems.map((item) => (
        <div
          key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            color: location.pathname === item.path ? "#ff5f6d" : "#888",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "18px",
            transition: "0.2s",
          }}
        >
          <div
            style={{
              padding: "8px 12px",
              borderRadius: "12px",
              background:
                location.pathname === item.path
                  ? "linear-gradient(135deg,#ff5f6d,#ffc371)"
                  : "transparent",
              color: location.pathname === item.path ? "#fff" : "#ccc",
            }}
          >
            {item.icon}
          </div>
          <span style={{ fontSize: "12px", marginTop: "4px" }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;
