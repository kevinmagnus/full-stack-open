import express from "express";
import User from "../models/userSignUpModel.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


export const getAllStudentsData = async (request, response) => {

    try {

        const studentsData = await User.find();

        console.log("Students' data retrieved successfully!");

        response.send(studentsData);


        
    } catch (error) {

        console.log('Error:', error);

        response.send("There was an error fetching students' data.");
        
    }

}



export const getStudentById = async (request, response) => {


    try {

        
        const studentId = parseInt(request.params.studentId);

        const student = await User.findOne({ studentId }).exec(); //'student' stores the student information from the database.

        if(!student) {

            console.log('Student with that ID does not exist.')

           return response.render('getStudentById', { error: null, message: 'Student with that ID was not found.'});

        }else{

            response.render('getStudentById', { error: null, message: student  });
        }



    } catch (error) {

        console.log('Error:', error);

        response.render('getStudentById', { error: "There was an error getting the student's data", message: null });
        
    }


}



export const getStudentByIdPage = async (request, response) => {


    
response.render('getStudentById');



}