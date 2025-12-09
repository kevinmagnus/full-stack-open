import adminCreateAccountModel from "../models/adminCreateAccountModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



dotenv.config();

//Authentication codes

export const authenticate = async (request, response, next) => {

  console.log('Authenticate middleware called');

  const token = request.cookies.token;

  console.log('Token:', token);
  
  if (!token) {

    console.log('No token found, redirecting to login');

    return response.render('admin-log-in');
    

  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded token:', decoded);
    
    const user = await adminCreateAccountModel.findById(decoded.userId);

    console.log('User:', user);
    
    if (!user) {

      console.log('User not found, redirecting to login');

      response.clearCookie('token');

      return response.render('admin-log-in');

    }

    request.user = user;
    
    console.log('User authenticated, proceeding to next middleware');
    next();

  } catch (error) {

    console.log('Error authenticating user:', error);

    response.clearCookie('token');

    return response.render('admin-log-in');

  }
};


//Code to render admin log in page.

export const showAdminLogInPage = async (request, response) => {


    
      try {
    
        response.render('admin-log-in', {message: null, error: null});
        
      } catch (error) {
    
        response.render('admin-log-in-response', {error: 'There was an error showing loading the page. Please make sure you have a good internet connection and try again.', message: null})
        
      }

    
    }
    



    //admin log in

export const adminLogIn =  async (request, response) => {

  try {
    const { email, password } = request.body;

    if (!email || !password) {

      return response.status(400).render('admin-log-in', { error: 'Email and password are required' , message: null});
    }

    const user = await adminCreateAccountModel.findOne({ email });
    if (!user) {
      return response.status(401).render('admin-log-in', { error: 'Invalid email or password', message: null });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response.status(401).render('admin-log-in', { error: 'Invalid email or password', message: null });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3m' });
    
    response.cookie('token', token, { 
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production'
    });
    
    response.render('admin-dashboard');

  } catch (error) {

    console.error('Log in unsuccessful:', error);

    response.status(500).render('admin-log-in', { error: 'An error occurred while logging to your account. Check your internet connection and try again', message: null});
  }

}


