import express from 'express';
import User from "../models/userSignUpModel.js";
import bcrypt from 'bcrypt';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const __dirname = path.resolve();




// code to show the tudenyt log in page
export const studentLogInPage = async (request, response) => {

const filePath = path.join(__dirname, 'public/Pages', 'Log-In.html');

response.sendFile(filePath);

}



// code to handle student log in

export const studentLogIn = async (request, response) => {


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

      
}