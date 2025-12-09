import User from "../models/userSignUpModel.js";

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
