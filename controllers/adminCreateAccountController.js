import adminCreateAccountModel from "../models/adminCreateAccountModel.js";

import bcrypt from 'bcrypt';



export const showAdminCreateAccountPage = async (request, response) =>{


  try {

    response.render('admin-create-account', {message: null, error: null});
    
  } catch (error) {

    response.render('admin-create-account-response', {error: 'There was an error showing loading the page. Please make sure you have a good internet connection and try again.', message: null})
    
  }

}



export const createAdminAccount = async (request, response) => {

    try {
    const { firstName, lastName, email, password } = request.body;
    
    if (!firstName || !lastName || !email || !password) {
      return response.status(400).render('admin-create-account', { error: 'All fields are required', message: null });
    }

    const existingAdmin = await adminCreateAccountModel.findOne({ email });
    if (existingAdmin) {
      return response.status(400).render('admin-create-account', { error: 'Email already exists', message: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new adminCreateAccountModel({ firstName, lastName, email, password: hashedPassword });

    await user.save();

    response.render('admin-create-account', { message: 'Your admin account was created successfully!', error: null });

    response.status(201).render('admin-dashboard');

  } catch (error) {

    console.error('Error creating user:', error);

    response.status(500).render('admin-create-account', { error: `${request.body.firstName}, an error occured while trying to create your account. Make sure you have a good internet connection and try again.`, message: null});
  }


}