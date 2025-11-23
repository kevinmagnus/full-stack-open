import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './public/config/database.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

dotenv.config();
const port = process.env.PORT || 4010;
const app = express();
const __dirname = path.resolve();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser());

// Database connection
connectDB();

const startServer = async () => {
  try {
    const connect = await connectDB();
    console.log(`Database connected successfully!`);
  } catch (error) {
    console.log('Error starting server:', error);
  }
}
startServer();

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledCourses: [String]
});

// Create the user model
const User = mongoose.model('User', userSchema);

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');


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
      response.clearCookie('token'); // Clear invalid token
      return response.redirect('/Log-In');
    }

    request.user = user;
    console.log('User authenticated, proceeding to next middleware');
    next();
  } catch (error) {
    console.log('Error authenticating user:', error);
    response.clearCookie('token'); // Clear invalid token
    return response.redirect('/Log-In');
  }

};

// Update your login route with better cookie options
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
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '7d' });
    
    // Set cookie with proper options
    response.cookie('token', token, { 
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      sameSite: 'lax' // Add this for better security
    });
    
    response.redirect('/dashboard');
  } catch (error) {
    console.error('Log in unsuccessful:', error);
    response.status(500).render('response', { error: 'Failed to log in user' });
  }
});

/*

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
      return response.redirect('/Log-In');
    }

    request.user = user;
    console.log('User authenticated, proceeding to next middleware');
    next();
  } catch (error) {
    console.log('Error authenticating user:', error);
    return response.redirect('/Log-In');
  }
};

*/


/*

const authenticate = async (request, response, next) => {
  const token = request.cookies.token;
  if (!token) {
    return response.redirect('/Log-In');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return response.redirect('/Log-In');
    }

    request.user = user;
    next();
  } catch (error) {
    return response.redirect('/Log-In');
  }
};

*/

/*
const authenticate = (request, response, next) => {
  const token = request.cookies.token;
  if (!token) {
    return response.redirect('/Log-In');
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return response.redirect('/Log-In');
    }

    User.findById(decoded.userId, (error, user) => {
      if (error || !user) {
        return response.redirect('/Log-In');
      }

      request.user = user;
      next();
    });
  });
};
*/

// Routes
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
    const students = await User.find().select('-password'); // exclude password field
    response.render('all-users',{ students });
  } catch (error) {
    console.error('Error fetching users:', error);
    response.status(500).render('all-users', { error: "Failed to fetch students' data"});
  }
});


app.post('/Sign-Up', async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    // Validate inputs
    if (!firstName || !lastName || !email || !password) {
      return response.status(400).render('response', { error: 'All fields are required' });
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


/*
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

    // Generate a token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    response.cookie('token', token, { httpOnly: true });
    response.redirect('/dashboard');
  } catch (error) {
    console.error('Log in unsuccessful.:', error);
    response.status(500).render('response', { error: 'Failed to log in user' });
  }
});


*/

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
  const user = request.user;
  const { oldPassword, newPassword } = request.body;

  // Validate old password
  const isValidPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isValidPassword) {
    return response.render('change-password', { error: 'Invalid old password' });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user password
  user.password = hashedPassword;
  await user.save();

  response.render('dashboard', { user, message: 'Password changed successfully' });
});

app.get('/logout', (request, response) => {
  response.clearCookie('token');
  response.redirect('/Log-In');
});



//Scholarship email code

app.get('/congratulation-email', (request,response) => {

// Create a transporter
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  }
});

// Define the email options
let mailOptions = {
  from: 'chigemezuemmanuel641@gmail.com',
  to: 'chigemezuemmanuel64@gmail.com',
  subject: 'Congratulations on Your Scholarship!',
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Congratulations on Your Scholarship!</title>
      <style>
        body {
          text-align: center;
          background-color: white;
        }
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .item {
          justify-content: center;
          margin: 5%;
          background-color: rgb(4, 67, 88);
          color: gray;
          border: solid 3px rgb(73, 88, 102);
          border-radius: 8px 8px 8px 8px;
          padding: 10px;
          width:auto;
          flex-wrap: wrap;
        }
        .card {
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 0 10px;
          background-color: rgba(66, 53, 53, 0.733);
          padding: 10px;
          transition: all 0.3s ease-in-out;
          margin: 10px;
          text-align: center;
          width:auto;
          flex-wrap: wrap;
        }
        .card:hover {
          box-shadow: 0 0 20px rgba(0, 0, 0,0.2);
          transform: translateY(-5px);
        }
        .enrollment,#sign-up-button {
          border: solid 3px gray;
          border-radius: 10px 0px 10px 0px;
          font-size: 25px;
          font-weight: 50px;
          color: rgb(0, 255, 179);
          width: auto;
          background-color: black;
        }
        img {
          margin: auto;
          padding: 0px;
          border-radius: 20px 20px 20px 20px;
          background-color: rgb(1, 28, 37);
          height: auto;
          border: solid turquoise;
          width: 100%;
        }
        p {
          color: rgb(111, 197, 197);
          font-family: Georgia, 'Times New Roman', Times, serif;
        }
        #motto {
          margin: 10px;
          color: springgreen;
          font-style: oblique;
        }
        h1, h2 {
          color: rgb(152, 217, 219);
          margin: 3px;
        }
        a {
          color: rgb(97, 255, 176);
          font-weight: 40px;
          text-decoration: none;
          font-size: 15px;
        }
        .price {
          font-size: 25px;
          font-weight: 40px;
          color: springgreen;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="item">
          <h1>Congratulations on Your Scholarship! 🎉</h1>
          <img src="https:                                                 
          <p>Dear [Name],</p>
          <p>We’re delighted to inform you that you’ve officially been awarded a Tech Scholarship with TS Academy to study Software Development.</p>
          <p>This scholarship covers up to 100% of your tuition (₦658,000).</p>
          <p>To secure your spot, please complete your application fee payment using the button below:</p>
          <a href="[Payment Link]" class="enrollment">Pay Application Fee</a>
          <p>Your scholarship spot is reserved for a limited time. Completing this step secures your place in the program and unlocks access to our Learning Management System (LMS).</p>
          <p>Our team will reach out to you shortly with your course information and onboarding details.</p>
          <p>We’re excited to welcome you into the Code Skill Africa community and can’t wait to see the impact you’ll make in Software Development.</p>
          <p id="motto">Empowering Africa through Technology</p>
          <p>Best regards,</p>
          <p>Code Skill Africa Team</p>
        </div>
      </div>
    </body>
    </html>
  `//example.com/image.jpg" alt="Scholarship Image">
          <p>Dear [Name],</p>
          <p>We’re delighted to inform you that you’ve officially been awarded a Tech Scholarship with TS Academy to study Software Development.</p>
          <p>This scholarship covers up to 100% of your tuition (₦658,000).</p>
          <p>To secure your spot, please complete your application fee payment using the button below:</p>
          <a href="[Payment Link]" class="enrollment">Pay Application Fee</a>
          <p>Your scholarship spot is reserved for a limited time. Completing this step secures your place in the program and unlocks access to our Learning Management System (LMS).</p>
          <p>Our team will reach out to you shortly with your course information and onboarding details.</p>
          <p>We’re excited to welcome you into the Code Skill Africa community and can’t wait to see the impact you’ll make in Software Development.</p>
          <p id="motto">Empowering Africa through Technology</p>
          <p>Best regards,</p>
          <p>Code Skill Africa Team</p>
        </div>
      </div>
    </body>
    </html>
  `
};




transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
    response.send(error);
  } else {
    console.log('Email sent: ' + info.response);
    response.send(info.response);
  }
  
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

  });
