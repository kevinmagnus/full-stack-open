import express from 'express';
import User from "../models/userSignUpModel.js";
import bcrypt from 'bcrypt';
import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const __dirname = path.resolve();


dotenv.config();



// code to show the tudenyt log in page
export const studentLogInPage = async (request, response) => {

const filePath = path.join(__dirname, 'public/Pages', 'Log-In.html');

response.sendFile(filePath);

}



// code to handle student log in

export const studentLogIn = async (request, response) => {


    try {

        const { identifier, password } = request.body;
    
        if (!identifier || !password) {
          
          return response.status(400).render('response', { error: 'Email/Student ID and password are required' });
        }

        //Build query to search by email or userID
        const isNumericId = /^\d+$/.test(identifier);
        const query = isNumericId
        ? { userId: parseInt(identifier) }
        : { email: identifier.toLowerCase() };


        
    
        const user = await User.findOne({ query });

        if (!user) {
          return response.status(401).render('response', { error: 'Invalid credentials.' });
        }
    
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {

          return response.status(401).render('response', { error: 'Invalid credentials.' });
          
        }
    
        const token = jwt.sign({ userId: user._id, studentId: user.userId, email: user.email, name: `${user.firstName} ${user.lastName}`}, process.env.JWT_SECRET, { expiresIn: '3m' });
        
        response.cookie('token', token, { 
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite: 'Strict',
          secure: process.env.NODE_ENV === 'production'
        });
        
        console.log(response);

        console.log(`User logged in: ${user.email} (Student ID: ${user.userId})`)
    
        return response.redirect('/dashboard');
    
      } catch (error) {
        console.error('Log in unsuccessful:', error);

        response.status(500).render('response', { error: 'An error occured during login. Please try again.' });
      }

      
}