const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/authMiddleware");
const nodemailer = require("nodemailer");

router.post("/send", auth, async (req, res) => {
  try {
    const { lat, lng } = req.body;

    // Get user's saved contacts
    const contacts = await Contact.find({ userId: req.user.id });

    if (contacts.length === 0) {
      return res.status(400).json({ message: "No contacts available." });
    }

    // Create mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
    const message = `
      ⚠️ SOS ALERT — Immediate Attention Required!
      
      A distress signal has been triggered from SafeSpace App.
      
      ▶ Track Live Location:
      ${mapLink}

      Please contact the user immediately.
    `;

    // Send email to each contact
    const sendEmails = contacts.map((c) =>
      transporter.sendMail({
        from: `"SafeSpace Alert" <${process.env.EMAIL_USER}>`,
        to: c.email, // ensure your contact has an email field
        subject: "🚨 SOS Alert from SafeSpace",
        text: message,
      })
    );

    await Promise.all(sendEmails);

    res.json({ message: "SOS Email sent to all emergency contacts." });
  } catch (error) {
    console.error("SOS Error:", error);
    res.status(500).json({ message: "SOS sending failed.", error });
  }
});

module.exports = router;
