import express from "express";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


export const getStudentDashboardSettingsPage = async (request, response) => {



    try {

        response.render('student-dashboard-setting');
        
    } catch (error) {
        
        console.log('Error', error);
    }


}
