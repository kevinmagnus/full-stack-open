import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userSignUpModel.js';



dotenv.config();

//Authentication codes

export const authenticate = async (request, response, next) => {

  console.log('Authenticate middleware called');

  const token = request.cookies.token;

  console.log('Token:', token);
  
  if (!token) {

    console.log('No token found, redirecting to login');

    return response.redirect('/Log-In');
    

  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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


export default authenticate;