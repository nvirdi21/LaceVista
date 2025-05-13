const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Replace with your Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your.email@gmail.com',
    pass: 'your_app_password' // Use an App Password if 2FA is enabled
  }
});

router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'your.email@gmail.com',
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to send email');
  }
});

module.exports = router;
