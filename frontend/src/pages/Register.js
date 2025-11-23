import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleRegister = async () => {
    if (!form.username || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${API_URL}/auth/register`, form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("User already exists");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          placeholder="Username"
          style={styles.input}
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          placeholder="Email Address"
          type="email"
          style={styles.input}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          style={styles.input}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button style={styles.button} onClick={handleRegister}>
          Register
        </button>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "90%",
    maxWidth: "380px",
    padding: "35px",
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(10px)",
    textAlign: "center",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#ff5f6d",
    marginBottom: "10px",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "15px",
    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    color: "white",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #ff5f6d, #ffc371)",
    borderRadius: "12px",
    border: "none",
    color: "white",
    fontWeight: "bold",
  },

  footerText: {
    marginTop: "15px",
    color: "#aaa",
  },

  link: {
    color: "#ff5f6d",
    cursor: "pointer",
  },
};

export default Register;
