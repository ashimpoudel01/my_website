// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PassThrough } = require('nodemailer/lib/xoauth2');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to handle contact form submission
app.post('/send', async (req, res) => {
    const { name, email, subject, message } = req.body;

   require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: pass.env.EMAIL_USER,
        pass: Pass.env.EMAIL_PASS
    }
});
    // ...existing code...
    const mailOptions = {
        from: email, // your Gmail address
        to: 'poudela2003@gmail.com',   // your Gmail address (or wherever you want to receive messages)
        subject: `New message from ${name}: ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`
};
// ...existing code...

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
