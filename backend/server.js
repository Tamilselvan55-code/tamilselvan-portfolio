import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
const allowedOrigins = [
  'http://localhost:5180',
  'https://tamilselvan-portfolio-06.web.app',
  'https://tamilselvan-portfolio-06.firebaseapp.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
})); // Allow Vite frontend during development and Firebase production
app.use(express.json()); // Parse JSON bodies

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio backend is running"
  });
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, mobile, email, message } = req.body;

    // Basic Validation
    if (!name || !mobile || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid contact information"
      });
    }

    // Additional length/format validation
    if (name.length > 100 || message.length > 5000 || mobile.length > 20) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid contact information"
      });
    }
    
    // Check email format basic
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid contact information"
      });
    }

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Default testing sender if no domain is verified
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Portfolio Contact — ${name}`,
      text: `New message received from your portfolio.

Name:
${name}

Mobile:
${mobile}

Email:
${email}

Message:
${message}

Date:
${new Date().toLocaleString()}
`
    });

    if (error) {
      console.error("Resend API Error:", error);
      return res.status(500).json({
        success: false,
        message: "Unable to send message"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send message"
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio backend running on port ${PORT}`);
});
