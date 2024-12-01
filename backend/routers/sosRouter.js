const express = require("express");
const SOS = require("../models/SOS");
const nodemailer = require("nodemailer");

const router = express.Router();

// POST endpoint to save SOS details
router.post("/send-sos", async (req, res) => {
  const { mobile, location, address } = req.body;

  if (!mobile || !location || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save SOS details to MongoDB
    const sos = new SOS({ mobile, location, address });
    await sos.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail password or App password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL, // Email to notify
      subject: "Emergency SOS Alert",
      text: `An SOS alert has been triggered.\n\nDetails:\nMobile: ${mobile}\nLocation: ${location}\nAddress: ${address}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "SOS sent successfully" });
  } catch (error) {
    console.error("Error sending SOS:", error);
    res.status(500).json({ error: "Failed to send SOS" });
  }
});

module.exports = router;
