import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';
import connectDB from './config/database.js';
import User from './models/userSignUpModel.js';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
const __dirname = path.resolve();

// Middleware
app.use(cookieParser());
app.use(cors({ 
  origin: process.env.FRONTEND_URL || '*',
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Database connection
const startServer = async () => {
  try {
    await connectDB();
    console.log(`Database connected successfully!`);
  } catch (error) {
    console.log('Error starting server:', error);
    process.exit(1);
  }
}

startServer();

// Authentication Middleware
const authenticate = async (request, response, next) => {
  console.log('Authenticate middleware called');
  const token = request.cookies.token;
  console.log('Token:', token);
  
  if (!token) {
    console.log('No token found, redirecting to login');
    return response.redirect('/Log-In');
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('Decoded token:', decoded);
    
    const user = await User.findById(decoded.userId);
    console.log('User:', user);
    
    if (!user) {
      console.log('User not found, redirecting to login');
      response.clearCookie('token');
      return response.redirect('/Log-In');
    }

    request.user = user;
    console.log('User authenticated, proceeding to next middleware');
    next();
  } catch (error) {
    console.log('Error authenticating user:', error);
    response.clearCookie('token');
    return response.redirect('/Log-In');
  }
};

// Routes
app.get('/', (request, response) => {
  const filePath = path.join(__dirname, 'Home.html');
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

app.get('/Create-Account', (request, response) => {
  const filePath = path.join(__dirname, 'public/Pages', 'Sign-Up.html');
  response.sendFile(filePath);
});

app.get('/Congrats', (request, response) => {
  const filePath = path.join(__dirname, 'public/Pages', 'congratulations.html');
  response.sendFile(filePath);
});

app.get('/Sign-Up', (request, response) => {
  response.render('Sign-Up');
});

// Get all users route
app.get('/users', async (request, response) => {
  try {
    const students = await User.find().select('-password'); 
    response.render('all-users', { students });
  } catch (error) {
    console.error('Error fetching users:', error);
    response.status(500).render('all-users', { error: "Failed to fetch students' data" });
  }
});

// Sign Up Route
app.post('/Sign-Up', async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    
    // Validate inputs
    if (!firstName || !lastName || !email || !password) {
      return response.status(400).render('response', { error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).render('response', { error: 'Invalid email format' });
    }

    // Validate password strength
    if (password.length < 8) {
      return response.status(400).render('response', { error: 'Password must be at least 8 characters long' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).render('response', { error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();

    response.render('response', { message: 'Your account was created successfully!' });
  } catch (error) {
    console.error('Error creating user:', error);
    response.status(500).render('response', { error: 'Failed to create your account.' });
  }
});

// Login Route
app.post('/User-Log-In', async (request, response) => {
  try {
    const { email, password } = request.body;
    
    // Validate inputs
    if (!email || !password) {
      return response.status(400).render('response', { error: 'Email and password are required' });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(401).render('response', { error: 'Invalid email or password' });
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response.status(401).render('response', { error: 'Invalid email or password' });
    }

    // Generate a token with longer expiration
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.SECRET_KEY, 
      { expiresIn: '7d' }
    );

    // Set cookie with secure options
    response.cookie('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    response.redirect('/dashboard');

  } catch (error) {
    console.error('Log in unsuccessful:', error);
    response.status(500).render('response', { error: 'Log in failed.' });
  }
});

// Dashboard Route
app.get('/dashboard', authenticate, (request, response) => {
  const user = request.user;
  response.render('dashboard', { user });
});

app.get('/all-courses', authenticate, (request, response) => {
  response.render('all-courses');
});

app.get('/change-password', authenticate, (request, response) => {
  response.render('change-password', { error: null, success: null });
});

// Change Password Route
app.post('/change-password', authenticate, async (request, response) => {
  try {
    const user = request.user;
    const { oldPassword, newPassword } = request.body;

    // Validate inputs
    if (!oldPassword || !newPassword) {
      return response.render('change-password', { 
        error: 'All fields are required',
        success: null 
      });
    }

    // Validate new password strength
    if (newPassword.length < 8) {
      return response.render('change-password', { 
        error: 'New password must be at least 8 characters long',
        success: null 
      });
    }

    // Validate old password
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return response.render('change-password', { 
        error: 'Current password is incorrect',
        success: null 
      });
    }

    // Check if new password is different from old password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return response.render('change-password', { 
        error: 'New password must be different from current password',
        success: null 
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    response.render('change-password', { 
      error: null,
      success: 'Password changed successfully!' 
    });

  } catch (error) {
    console.error('Error changing password:', error);
    response.render('change-password', { 
      error: 'Failed to change password. Please try again.',
      success: null 
    });
  }
});

// Logout Route
app.get('/logout', (request, response) => {
  response.clearCookie('token');
  response.redirect('/Log-In');
});

app.post('/logout', (request, response) => {
  response.clearCookie('token');
  response.redirect('/Log-In');
});

// 404 Handler
app.use((request, response) => {
  response.status(404).send('Page not found');
});

// Error Handler
app.use((error, request, response, next) => {
  console.error('Server error:', error);
  response.status(500).send('Internal server error');
})


app.listen(process.env.PORT || 4010, '0.0.0.0', () => {
  console.log(`Server is running on port ${process.env.PORT || 4010}`);
});
