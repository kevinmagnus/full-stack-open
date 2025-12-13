import express from 'express';
import path from 'path';
import ejs from 'ejs';
import connectDB from './config/database.js';
import User from './models/userSignUpModel.js';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';



// Routes imports
import scholarshipRegistrationRoute from './routes/studentScholarshipRegistrationRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';
import adminCreateAccountRoutes from './routes/adminCreateAccountRoutes.js';
import adminLogInRoutes from './routes/adminLogInRoutes.js';
import getAllStudentsDataRoutes from './routes/getAllStudentsDataRoutes.js';
import createStudentAccountRoutes from './routes/studentCreateAccountRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import studenDashboardSettingRoutes from './routes/studentDashboardSettingsRoutes.js';
// Load environment variables first
dotenv.config();

const app = express();
const __dirname = path.resolve();

// Secret key from environment variable
const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  console.error('FATAL ERROR: JWT_SECRET is not defined in environment variables.');
  process.exit(1);
}

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser());

app.use('/', scholarshipRegistrationRoute); //This route is for the students scholarhip registration logics.
app.use('/', adminCreateAccountRoutes);
app.use('/', adminLogInRoutes);
app.use('/', getAllStudentsDataRoutes); 
app.use('/', createStudentAccountRoutes);
app.use('/', emailRoutes);
app.use('/', studenDashboardSettingRoutes); //This is the routes for student dashboard settings.

// Database connection

connectDB();

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

    const decoded = jwt.verify(token, secretKey);

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

// Use password routes
app.use('/password-reset', passwordRoutes);

// Login Route
app.post('/User-Log-In', async (request, response) => {

  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).render('response', { error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(401).render('response', { error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response.status(401).render('response', { error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '3m' });
    
    response.cookie('token', token, { 
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production'
    });
    
    console.log(response);

    response.redirect('/dashboard');

  } catch (error) {
    console.error('Log in unsuccessful:', error);
    response.status(500).render('response', { error: 'An error occurred while logging to your account. Please try again.' });
  }
});

// Public Routes
app.get('/', (request, response) => {
  const filePath = path.join(__dirname, 'Home.html');
  response.sendFile(filePath);
});


app.get('/Home', (request, response) => {
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



app.get('/Congrats', (request, response) => {
  const filePath = path.join(__dirname, 'public/Pages', 'congratulations.html');
  response.sendFile(filePath);
});


app.get('/forgot-password-page', (request, response) => {
  response.render('forgot-password');
});


app.get('/send-email-page', (request, response) => {

  response.render('send-email');
  
});



// Protected Routes
app.get('/dashboard', authenticate, (request, response) => {

  const user = request.user;

  response.render('dashboard', { user });

});

app.get('/all-courses', authenticate, (request, response) => {
  response.render('all-courses');
});

app.get('/change-password', authenticate, (request, response) => {
  response.render('change-password');
});

app.post('/change-password', authenticate, async (request, response) => {

  try {
    const user = request.user;
    const { oldPassword, newPassword } = request.body;

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return response.render('change-password', { error: 'Invalid old password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    response.render('dashboard', { message: 'Password changed successfully' });
  } catch (error) {
    console.log(error);
    response.status(500).render('change-password', { error: 'Failed to change password' });
  }
});

app.get('/logout', (request, response) => {
  response.clearCookie('token');
  response.redirect('/Log-In');
});

// Start Server
const PORT = process.env.PORT || 4010;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);

});
