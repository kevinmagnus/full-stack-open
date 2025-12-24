import bcrypt from 'bcrypt';
import adminCreateAccountModel from '../models/adminCreateAccountModel.js';
import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const __dirname = path.resolve();
dotenv.config();





const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));






const COOKIE_OPTS = {


    httpOnly: true,
    secure: process.env.NODE_ENV,
    sameSite: 'strict',
    maxAge: 3*60*1000,
};
// Logic to get render admin create account page
export const getAdminCreateAccountPage = async (request, response) => {

    try {
        
      console.log('Rendered admin create account page.');
    
        response.render('admin-create-account');
    
    } catch (error) {
        
        console.log('Error', error);
    }
    
    
    }


//logic to render admin login page.
    export const getAdminLogInPage = async (request, response) => {

    try {

      console.log('Rendered admin log in page.');
        
    
        response.render('admin-log-in');
    
    } catch (error) {
        
        console.log('Error', error);
    }
    
    
    }






//logic to render admin dashboard page
    export const getAdminDashboardPage = async (request, response) => {

    try {

      console.log('Rendered admin dashboard page.');
        
    
        response.render('admin-dashboard');
    
    } catch (error) {
        
        console.log('Error', error);
    }
    
    
    }




//Logic that handles admin create account.
export const createAdminAccount = async (request, response) => {


    try {



        const { firstName, lastName, email, password } = request.body;



//code to check for empty inputs.
if (!firstName || !lastName || !email || !password) {

    response.render('admin-create-account', { error: 'All field are required.', message: null });

}

//email validation logic.
const emailRegex = /^\S+@\S+\.\S+$/;

        if (!emailRegex.test(email)) {

          return response.status(400).render('admin-create-account', { error: 'Please enter a valid email address.', message: null });

        }


        if(password.length < 6) {

          return response.status(400).render('admin-create-account', { error: 'Password must be at least 6 characters long.', message: null});

        }


        const existingAdmin = await adminCreateAccountModel.findOne({ email });

                if (existingAdmin) {
        
                  return response.status(400).render('admin-create-account', { error: 'An admin with that email already exists', message: null });
        
                }


                const hashedPassword = await bcrypt.hash(password, 10);
                
                        const admin = new adminCreateAccountModel({ firstName, lastName, email, password: hashedPassword });

                        await admin.save();

                        console.log('Admin account created successfully!');

                        return response.status(201).render('admin-log-in', { message: 'Your admin account was created successfully! Log in.', error: null });

                        
    


        
    } catch (error) {

        console.error('Error creating user:', error);
    
        response.status(500).render('admin-create-account', { error: 'An error occured while trying to create your admin account. Please try again.' });
        
    }




}



//logic to handle admin log in.

export const adminLogIn = async (request, response) => {
  try {
    const { email, password } = request.body;
    
    if (!email || !password) {

      return response.status(400).render('response', { error: 'Email and password are required' });
    }

    // Find admin by email
    const admin = await adminCreateAccountModel.findOne({ email });

    if (!admin) {
      return response.status(401).render('response', { error: 'Invalid credentials.' });
    }

    // FIXED: Changed 'user.password' to 'admin.password'
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return response.status(401).render('response', { error: 'Invalid credentials' });
    }

    // FIXED: Sign only userId, not entire admin object
    const token = jwt.sign(
      { id: admin._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '3m' }
    );
    
    // FIXED: Cookie maxAge now matches JWT expiration (3 minutes)
    // FIXED: Changed 'Strict' to 'strict' (lowercase)
    response.cookie('adminToken', token, COOKIE_OPTS );
    
    console.log(`Admin logged in: ${token}`, admin);

    return response.redirect('/api/admin-dashboard');

  } catch (error) {
    console.log('Error', error);
    return response.status(500).render('admin-log-in', { 
      message: null, 
      error: 'An error occurred while logging into your account. Please try again.'
    });
  }
};



export const adminLogOut = async (request, response) => {

    response.clearCookies('adminToken', COOKIE_OPTS);
    response.redirect('/api/admin-log-in');

}