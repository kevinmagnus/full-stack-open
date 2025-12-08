import studentScholarshipRegistrationModel from "../models/studentScholarshipRegistrationModel.js";


export const createScholarshipRegistration = async(request, response) =>{

    try {
      
        const scholar = new studentScholarshipRegistrationModel(request.body);

        const firstName = request.body.first_name;

        await scholar.save();

        console.log('Scholarship application submitted successfully!');

        response.render('scholarship-registration-response', {error: null, message: `${firstName}, your scholarship application was submitted successfully! Look forward to hear from us sooner.`});

        
    } catch (error) {

        console.log(error);
        response.render('scholarship-registration-response', {error: 'Sorry, there was an error submitting your application. Kindly try again.', message: null});
    }

}




    



export const showScholarshipApplicationPage = async (request, response) => {


    
      try {
    
        response.render('scholarship-registration', {message: null, error: null});
        
      } catch (error) {
    
        response.render('scholarship-registration-response', {error: 'There was an error showing loading the page. Please make sure you have a good internet connection and try again.', message: null})
        
      }

    
    }
    


    export const showScholarshipApplicationResponse = async (request, response) => {


    
      try {
    
        response.redirect('/api/show-application-response');
        
      } catch (error) {
    
        response.render('/api/', {error: 'There was an error showing loading the page. Please make sure you have a good internet connection and try again.', message: null})
        
      }

    
    }
    





