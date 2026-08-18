import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender must be the configured Gmail account
      to: 'tamilselvane748@gmail.com', // Destination email
      replyTo: email, // Visitor's email for easy reply
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
    };

    // Send the email
    await transporter.sendMail(mailOptions);

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

// Transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP verification failed. Check credentials.");
  } else {
    console.log("SMTP server is ready to take our messages");
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio backend running on port ${PORT}`);
});
