import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });


  const handleLogin = async () => {
    if (!form.username || !form.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>SafeSpace</h2>
        <p style={styles.subtitle}>Welcome back! Please login.</p>

        <input
  placeholder="Username"
  type="text"
  style={styles.input}
  value={form.username}
  onChange={(e) => setForm({ ...form, username: e.target.value })}
/>


        <input
          placeholder="Password"
          type="password"
          style={styles.input}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button style={styles.button} onClick={handleLogin}>Login</button>

        <p style={styles.footerText}>
          New user?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    width: "100vw",
    margin: 0,
    padding: 0,
    backgroundColor: "#000",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    overflow: "hidden",
  },

  card: {
    width: "90%",
    maxWidth: "380px",
    padding: "35px",
    borderRadius: "18px",

    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(10px)",

    /* SUBTLE pink shadow (controlled, smaller radius) */
    boxShadow: "0 0 25px rgba(255, 95, 109, 0.12)",

    textAlign: "center",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#ff5f6d",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#ccc",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "15px",

    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    color: "white",
    fontSize: "15px",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "8px",

    background: "linear-gradient(135deg, #ff5f6d, #ffc371)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",

    border: "none",
    borderRadius: "12px",
    cursor: "pointer",

    boxShadow: "0 4px 15px rgba(255,95,109,0.3)",
  },

  footerText: {
    marginTop: "15px",
    color: "#aaa",
  },

  link: {
    color: "#ff5f6d",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;
