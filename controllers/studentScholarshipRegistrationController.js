

//Controller that handles the student application logic.

export const createScholarshipRegistration = async(request, response) =>{



  try {


  
  const { course, reason }  = request.body;

  if (!course || !reason) {

    return response.status(400).render('scholarship-registration', { error: 'All fields are required.', message: null });
  }
  
    
  const user = request.user;

  //Code to check igf user has previously applied to the course.

  const existingApplication = user.scholarshipAppliedCourses.find( (application) => application.course.toLowerCase() === course.toLowerCase());
  
  if (existingApplication)  {

    return response.status(400).render('scholarship-registration', { error: `You have already applied for ${course} course.`, message: null });

}


user.scholarshipAppliedCourses.push({course, reason});

await user.save();

response.status(201).render('scholarship-registration', { error: null, message: `Your scholarship application for ${course} course was successful! Keep an eye on your email to hear back from us sooner.`});

console.log('Scholarship application submitted successfully!');

}catch(error) {

  console.log('Error', error);

  response.status(500).render('scholarship-registration', { error: 'An error occured while trying to submit your application. Please try again.', message: null });


}

}



export const showScholarshipApplicationPage = async (request, response) => {


    
      try {
    
        response.render('scholarship-registration', {message: null, error: null});
        
      } catch (error) {
    
        response.render('scholarship-registration-response', {error: 'There was an error loading the scholarship application page. Please try again.', message: null})
        
      }

    
    }
    



    //Controller that renders the scholarship application page.

    export const showScholarshipApplicationResponse = async (request, response) => {

    
        response.redirect('/api/show-application-response');
        

    
    }
    





