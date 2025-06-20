const express = require('express');
const emailjs = require('@emailjs/browser');

const router = express.Router();

router.post('/contact', async (req, res) => {
    const { name, email, subject, content } = req.body;
    
    try {
        const templateParams = {
            from_name: name,
            reply_to: email,
            to_email: process.env.RECEIVER_EMAIL,
            subject: subject,
            message_html: content
        };

        await emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            templateParams
        );

        res.json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;