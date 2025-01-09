const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(express.json()); 

app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  // email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'bbstravel277@gmail.com',
    to: email,
    subject: 'Welcome to our Newsletter!',
    text: 'You have successfully subscribed to our newsletter.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    console.log('Email sent:', info.response);
    res.json({ message: 'Subscription successful' });
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});