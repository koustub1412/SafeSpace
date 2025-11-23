const express = require("express");
const Contact = require("../models/Contact");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ADD CONTACT
// ADD CONTACT
router.post("/add", auth, async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({
      userId: req.user.id,
      name,
      phone,
      email
    });

    await newContact.save();
    res.json({ message: "Contact Added", newContact });

  } catch (error) {
    res.status(500).json({ message: "Error Adding Contact", error });
  }
});


// GET ALL CONTACTS
router.get("/get", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Contacts", error });
  }
});

// DELETE CONTACT
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Contact", error });
  }
});

module.exports = router;
