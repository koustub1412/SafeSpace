import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";
import BottomNav from "../components/BottomNav";

function SOS() {
  const [sosHistory, setSosHistory] = useState([]);

  const sendSOS = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const token = localStorage.getItem("token");

      try {
        await axios.post(
          `${API_URL}/sos/send`,
          {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Add timestamp after successful SOS
        const timestamp = new Date().toLocaleString();
        setSosHistory((prev) => [...prev, timestamp]);

        alert("🚨 SOS Sent Successfully to All Contacts!");

      } catch (err) {
        console.log(err);
        alert("Failed to send SOS.");
      }
    });
  };

  return (
    <div className="page-wrapper">
      <h1 style={{ color: "#ff5f6d", marginBottom: "20px" }}>SOS Alert</h1>

      {/* SOS BUTTON */}
      <button
        style={sosBtn}
        onClick={sendSOS}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
      >
        SEND SOS
      </button>

      {/* SOS HISTORY */}
      <div style={{ marginTop: "25px", color: "#ff5f6d", textAlign: "center" }}>
        <h3>SOS Alerts Sent</h3>

        {sosHistory.length === 0 ? (
          <p style={{ color: "#ccc" }}>No SOS alerts sent yet.</p>
        ) : (
          sosHistory.map((time, index) => (
            <p key={index}>⚠️ SOS sent at: {time}</p>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}

const sosBtn = {
  width: "220px",
  height: "220px",
  borderRadius: "200px",
  background: "linear-gradient(135deg,#ff5f6d,#ffc371)",
  color: "white",
  border: "none",
  fontSize: "26px",
  fontWeight: "bold",
  margin: "50px auto",
  display: "block",
  boxShadow: "0 0 30px rgba(255,95,109,0.4)",
  cursor: "pointer",
  position: "relative",
  zIndex: 9999,
  transition: "0.2s ease",
};

export default SOS;
