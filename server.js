import express from 'express';
import path from 'path';
import connectDB from './config/database.js';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import authenticate from './controllers/authController.js';



// Routes imports
import scholarshipRegistrationRoutes from './routes/studentScholarshipRegistrationRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';
import getAllStudentsDataRoutes from './routes/getAllStudentsDataRoutes.js';
import studenDashboardSettingRoutes from './routes/studentDashboardSettingsRoutes.js';
import studentAccountRoutes from './routes/studentAccountRoutes.js';
import sendUsMessageRoutes from './routes/sendUsMessageRoutes.js';

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


//Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser());

app.use('/', scholarshipRegistrationRoutes); //This route is for the students scholarhip registration logics.
app.use('/', getAllStudentsDataRoutes);
app.use('/', studenDashboardSettingRoutes);
app.use('/', studentAccountRoutes);
app.use('/', sendUsMessageRoutes);
app.use('/', passwordRoutes);
app.use('/password-reset', passwordRoutes);





connectDB();


// Public Routes
app.get('/', (request, response) => {
  const filePath = path.join(__dirname, 'Home.html');
  response.sendFile(filePath);
});


app.get('/Home', (request, response) => {
  const filePath = path.join(__dirname, 'Home.html');
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






app.get('/forgot-password-page', (request, response) => {
  response.render('forgot-password');
});


app.get('/send-email-page', (request, response) => {

  response.render('send-email');
  
});



// Protected Routes
app.get('/dashboard', authenticate, (request, response) => {

  const user = request.user;

  response.render('dashboard', { firstName: user.firstName, studentId: user.userId });

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

      return response.render('change-password', { error: 'Invalid old password' , message: null });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    console.log('Password changed successfully.');

    


    return response.status(200).render('response', { message: 'Password changed successfully! Please log in with your new password.', error: null })

    


    

  } catch (error) {
    
    console.log(error);

   return response.status(500).render('change-password', { error: 'An error occured while trying to change your password. Try again.' });
  }
});

app.get('/logout', (request, response) => {
  response.clearCookie('token');
  response.redirect('/api/Log-In');
});

// Start Server
const PORT = process.env.PORT || 4010;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);

});
