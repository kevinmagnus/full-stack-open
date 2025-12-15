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
        const { firstName, lastName, email, password , country} = request.body;
        
        if (!firstName || !lastName || !email || !password || !country) {
          return response.status(400).render('response', { error: 'All fields are required' });
        }
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return response.status(400).render('response', { error: 'A user with that email already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, country, password: hashedPassword });
        await user.save();
    
        
        response.render('response', { message: `Your account was created successfully!` });
    
        console.log("Account was created successfully!");

      } catch (error) {
    
        console.error('Error creating user:', error);
    
        response.status(500).render('response', { error: 'An error occured while trying to create your account. Make sure you have a good internet connection.' });
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