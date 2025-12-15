import studentScholarshipRegistrationModel from "../models/studentScholarshipRegistrationModel.js";
import sendScholarshipRegistrationConfirmationEmail from '../services/scholarshipRegistrationEmailService.js';
import scholarshipRegistrationConfirmationEmail from '../services/scholarshipRegistrationEmailService.js';

export const createScholarshipRegistration = async(request, response) =>{

    try {

      
      
        const scholar = new studentScholarshipRegistrationModel(request.body);

        const firstName = request.body.first_name;

        await scholar.save();

        console.log('Scholarship application submitted successfully!');

        scholarshipRegistrationConfirmationEmail (request.body.email, firstName);

        response.render('scholarship-registration-response', {error: null, message: `${firstName}, your scholarship application was submitted successfully! Look forward to hear from us sooner.`});

        await sendScholarshipRegistrationConfirmationEmail(scholar);

        
    } catch (error) {

        console.log(error);
        response.render('scholarship-registration-response', {error: 'Sorry, there was an error submitting your application. Kindly try again.', message: null});
    }

}




    



export const showScholarshipApplicationPage = async (request, response) => {


    
      try {
    
        response.render('scholarship-registration', {message: null, error: null});
        
      } catch (error) {
    
        response.render('scholarship-registration-response', {error: 'There was an error loading the scholarship application page. Please try again.', message: null})
        
      }

    
    }
    


    export const showScholarshipApplicationResponse = async (request, response) => {

    
        response.redirect('/api/show-application-response');
        

    
    }
    





