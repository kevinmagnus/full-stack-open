import bcrypt from 'bcrypt';
import adminCreateAccountModel from '../models/adminCreateAccountModel.js';


export const adminCreateAccountPage = async (request, response) {

    try {

        const { firstName, lastName, email, password } = request.body;

        if ( !firstName || !lastName || !email || !password ) {

            
        }
        
    } catch (error) {
        
    }


}