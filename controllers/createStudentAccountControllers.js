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


export const createStudentAccount = async (request, response) => {


    try {

        const { firstName, lastName, email, password , country, phoneNumber, dateOfBirth } = request.body;
        
        if (!firstName || !lastName || !email || !password || !country || !dateOfBirth || !phoneNumber ) {
          return response.status(400).render('response', { error: 'All fields are required' });

        }

        //Validate email address

        const emailRegex = /^\S+@\S+\.\S+$/;

        if (!emailRegex.test(email)) {

          return response.status(400).render('response', { error: 'Please enter a valid email address.', message: null });

        }


        if(password.length < 6) {

          return response.status(400).render('response', { error: 'Password must be at least 6 characters long.', message: null})
        }


        
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {

          return response.status(400).render('response', { error: 'A user with that email already exists' });

        }


        

        const userId = await User.generateUserId();

        console.log('Generated userId:', userId, 'Type:', typeof userId);

        if (!userId || isNaN(userId)) {

          throw new Error('Invalid userId generated');
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, email, country, password: hashedPassword, phoneNumber, dateOfBirth, userId: Number(userId) });

        await user.save();
    
      console.log("Your account was created successfully!");

       return response.status(201).render('response', { message: `Your account was created successfully!`, error: null });
    
        

      } catch (error) {
    
        console.error('Error creating user:', error);
    
        response.status(500).render('response', { error: 'An error occured while trying to create your account. Please try again.' });
      }




}




export const getStudentCreateAccountPage = async(request, response) => {

try {
    

    const filePath = path.join(__dirname, 'public/Pages', 'Sign-Up.html');

  response.sendFile(filePath);

} catch (error) {
    
    console.log('Error', error);
}


}