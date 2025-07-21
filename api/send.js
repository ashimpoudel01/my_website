// api/send.js
require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Ensure this function only handles POST requests
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    // Vercel automatically parses the JSON body, so we can access it directly
    const { name, email, subject, message } = req.body;

    // Check if all required fields are present
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All form fields are required.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}: ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Nodemailer Error:', error); // Log the full error on the server
        res.status(500).json({ message: 'Failed to send message due to a server error.' });
    }
};
