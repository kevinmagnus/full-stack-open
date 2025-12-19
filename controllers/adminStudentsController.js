import express from 'express';
import User from '../models/userSignUpModel.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

//logic to render students data page.
export const getStudentsDataPage = async (request, response) => {

    try {

        response.render('all-students');

        
    } catch (error) {

        console.log('Error loading students data page.', error);
        
    }
}


//logic to get all students data.
export const getAllStudentsData = async (request, response) => {

    try {

        const users = await User.find({}).lean();

       return response.render('all-students', { error: null, users });


        
    } catch (error) {

        console.log('Error fetching students data', error);

        return response.status(500).render('all-students', { error: 'Error fetching users.', allStudents: null});
        
    }



}