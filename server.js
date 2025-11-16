import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

const port = process.env.PORT || 4010;
const app = express();
const __dirname = path.resolve();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
<<<<<<< HEAD
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

dotenv.config();


<<<<<<< HEAD
=======

>>>>>>> 55dfcfa (Corrected email sending code errors)
=======
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Email transporter configuration
>>>>>>> 5db3960 (verson 55)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    },
    tls: {
<<<<<<< HEAD
        rejectUnauthorized: false;
=======
        rejectUnauthorized: false  // Changed semicolon to proper syntax
>>>>>>> 5db3960 (verson 55)
    }
});

// Verify transporter
transporter.verify((error, success) => {
    if (error) {
        console.error('Email transporter error:', error);
    } else {
        console.log('Email server is ready');
    }
});

// Email validation function
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Sanitize input function
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input.trim()
        .replace(/[<>'"]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');
};

// Routes
app.get('/', (request, response) => {
    const filePath = path.join(__dirname, 'Home.html');
    response.sendFile(filePath);
});

app.get('/Testimonials', (request, response) => {
    const filePath = path.join(__dirname, 'public/Pages', 'Testimonial.html');
    response.sendFile(filePath);
});

app.get('/Sign-Up', (request, response) => {
    const filePath = path.join(__dirname, 'public/Pages', 'Sign-Up.html');
    response.sendFile(filePath);
});

app.get('/Log-In', (request, response) => {
    const filePath = path.join(__dirname, 'public/Pages', 'Log-In.html');
    response.sendFile(filePath);
});

app.get('/Front-End-Learn-More', (request, response) => {
    const filePath = path.join(__dirname, 'public/Pages', 'Front-End-Learn-More.html');
    response.sendFile(filePath);
});

app.get('/Back-End-Learn-More', (request, response) => {
    const filePath = path.join(__dirname, 'public/Pages', 'Back-End-Learn-More.html');
    response.sendFile(filePath);
});

app.get('/Front-End-Enroll', (request, response) => {
    const filePath = path.join(__dirname, 'public/Pages', 'Front-End-Enroll.html');
    response.sendFile(filePath);
});

app.get('/Back-End-Enroll', (request, response) => {
    const filePath = path.join(__dirname, 'public/Pages', 'Back-End-Enroll.html');
    response.sendFile(filePath);
});

app.get('/FullStack-Enroll', (request, response) => {
    const filePath = path.join(__dirname, 'public/Pages', 'FullStack-Enroll.html');
    response.sendFile(filePath);
});

app.get('/Our-Mission', (request, response) => {
    const filePath = path.join(__dirname, 'public/Pages', 'Our-Mission.html');
    response.sendFile(filePath);
});

app.get('/Contact-Us', (request, response) => {
    const filePath = path.join(__dirname, 'public/Pages', 'Contact-Us.html');
    response.sendFile(filePath);
});

app.get('/Payment-Success', (request, response) => {
    const filePath = path.join(__dirname, 'public/Pages', 'Payment-Success.html');
    response.sendFile(filePath);
});

app.get('/Admin-Home-Page', (request, response) => {
    const filePath = path.join(__dirname, 'public/Pages/Admin', 'Admin-Home-Page.html');
    response.sendFile(filePath);
});

app.get('/Admin-Dashboard', (request, response) => {
    const filePath = path.join(__dirname, 'public/Pages/Admin', 'Admin-Dashboard.html');
    response.sendFile(filePath);
});

// Email sending route - FIXED
app.post('/Send-Email', async (request, response) => {
    try {
        const { first_name, last_name, email, message } = request.body;

        // Validate inputs
        if (!first_name || !last_name || !email || !message) {
            return response.status(400).render('email-error', {
                first_name: first_name || 'User',
                error_message: 'All fields are required'
            });
        }

        // Sanitize inputs
        const sanitizedFirstName = sanitizeInput(first_name);
        const sanitizedLastName = sanitizeInput(last_name);
        const sanitizedEmail = email.trim();
        const sanitizedMessage = sanitizeInput(message);

        // Validate email
        if (!isValidEmail(sanitizedEmail)) {
            return response.status(400).render('email-error', {
                first_name: sanitizedFirstName,
                error_message: 'Invalid email address'
            });
        }

<<<<<<< HEAD

const mailOptions = {

    from: request.body.email ,
    to: 'chigemezuemmanuel641@gmail.com',
<<<<<<< HEAD
    subject: `Code Skill Academy: Message from ${request.body.first_name} ${request.body.last_name} , Email: ${request.body.email}.`,
    text: request.body.message
=======
    subject: `Code Skill Academy: Message from ${first_name} ${last_name} , Email: ${email}.`,
    text: message
>>>>>>> 55dfcfa (Corrected email sending code errors)
}




transporter.sendMail(mailOptions, (error, info) => { 


    try(error) {


        response.render('email-error');

        console.log('Error: '+ error);
=======
        // Validate message length
        if (sanitizedMessage.length < 10) {
            return response.status(400).render('email-error', {
                first_name: sanitizedFirstName,
                error_message: 'Message is too short'
            });
        }

        // Mail options
        const mailOptions = {
            from: `"${sanitizedFirstName} ${sanitizedLastName}" <${process.env.USER_EMAIL}>`,
            to: 'chigemezuemmanuel641@gmail.com',
            replyTo: sanitizedEmail,
            subject: `Code Skill Academy: Message from ${sanitizedFirstName} ${sanitizedLastName}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>New Contact Form Message</h2>
                    <hr>
                    <p><strong>From:</strong> ${sanitizedFirstName} ${sanitizedLastName}</p>
                    <p><strong>Email:</strong> ${sanitizedEmail}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                        <p style="white-space: pre-wrap;">${sanitizedMessage}</p>
                    </div>
                </div>
            `,
            text: `New Contact Form Message\n\nFrom: ${sanitizedFirstName} ${sanitizedLastName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}`
        };
>>>>>>> 5db3960 (verson 55)

        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully:', info.messageId);
        response.render('email-success', {
            first_name: sanitizedFirstName,
            success_message: 'Your message has been sent successfully!'
        });

<<<<<<< HEAD
    }catch{

        response.render('email-success');

        console.log('Email sent: '+ info.response);
    
=======
    } catch (error) {
        console.error('Error sending email:', error);
        response.status(500).render('email-error', {
            first_name: request.body.first_name || 'User',
            error_message: 'Failed to send email. Please try again later.'
        });
>>>>>>> 5db3960 (verson 55)
    }
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});