import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import adminCreateAccountModel from '../models/adminCreateAccountModel.js';



dotenv.config();

//Authentication codes

export const adminAuthenticate = async (request, response, next) => {

  console.log('Authenticate middleware called');

  const token = request.cookies.token;

  console.log('Token:', token);
  
  if (!token) {

    console.log('No token found, redirecting to login');

    return response.redirect('/api/admin-log-in');
    

  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded token:', decoded);
    
    const admin = await adminCreateAccountModel.findById(decoded.userId);

    console.log('Amin:', admin);
    
    if (!admin) {

      console.log('Admin not found, redirecting to login');

      response.clearCookie('token');

      return response.redirect('/api/admin-log-in');

    }

    request.user =admin;
    
    console.log('Admin authenticated, proceeding to next middleware');
    next();

  } catch (error) {

    console.log('Error authenticating admin:', error);

    response.clearCookie('token');

    return response.redirect('/api/admin-log-in');

  }
};


export default adminAuthenticate;