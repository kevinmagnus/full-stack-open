import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import adminCreateAccountModel from '../models/adminCreateAccountModel.js';

dotenv.config();

const COOKIE_OPTS = {


    httpOnly: true,
    secure: process.env.NODE_ENV,
    sameSite: 'strict',
    maxAge: 3*60*1000,
};




const authenticateAdmin = async (request, response, next) => {

const token = request.cookies.adminToken;

if(!token) {

    console.log('No admin token.');
    response.redirect('/api/admin-log-in');

}


try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await adminCreateAccountModel.findById(decoded.id).select('-password');

    if (!admin) {

        console.log('Admin token not found');

        response.redirect('/api/admin-log-in');

    
    }

    request.admin = admin;

next();


    
} catch (error) {

    response.clearCookies('adminToken', COOKIE_OPTS);
    response.redirect('/api/admin/log-in');
    
}


}


export default authenticateAdmin;