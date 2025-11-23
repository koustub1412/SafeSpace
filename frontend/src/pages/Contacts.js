import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/api";
import BottomNav from "../components/BottomNav";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/contacts/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addContact = async () => {
    if (!form.name || !form.phone || !form.email) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/contacts/add`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm({ name: "", phone: "", email: "" });
      fetchContacts();
    } catch (err) {
      console.log(err);
      alert("Failed to add contact");
    }
  };

  const deleteContact = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/contacts/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchContacts();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "15px",
    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    color: "white",
    fontSize: "15px",
    outline: "none",
  };

  const buttonStyle = {
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
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: "40px" }}>
      <h2 style={{ color: "#ff5f6d", marginBottom: "10px" }}>
        Emergency Contacts
      </h2>

      {/* Add Contact Card */}
      <div
        style={{
          width: "90%",
          maxWidth: "380px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.06)",
          padding: "30px",
          borderRadius: "18px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 25px rgba(255, 95, 109, 0.12)",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h3 style={{ color: "#fff", marginBottom: "20px" }}>
          Add New Contact
        </h3>

        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={inputStyle}
        />

        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          style={inputStyle}
        />

        <input
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={inputStyle}
        />

        <button style={buttonStyle} onClick={addContact}>
          Add Contact
        </button>
      </div>

      {/* SAVED CONTACTS */}
      <h3 style={{ color: "#fff", marginBottom: "10px" }}>
        Saved Contacts
      </h3>

      {contacts.map((c) => (
        <div
          key={c._id}
          style={{
            background: "rgba(255,255,255,0.06)",
            padding: "18px",
            borderRadius: "12px",
            marginBottom: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#fff" }}>
            <strong>{c.name}</strong> <br />
            {c.phone} <br />
            <span style={{ color: "#bbb", fontSize: "13px" }}>
              {c.email}
            </span>
          </div>

          <button
            onClick={() => deleteContact(c._id)}
            style={{
              background: "#ff5f6d",
              border: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}

      <BottomNav />
    </div>
  );
}

export default Contacts;
