import scholarshipRegistrationConfirmationEmail from '../services/scholarshipRegistrationEmailService.js';

// Controller that handles the student scholarship application logic.

export const createScholarshipRegistration = async (request, response) => {

  try {
    const { course, reason } = request.body;

    // Validate required fields
    if (!course || !reason) {
      return response.status(400).render('scholarship-registration', { 
        error: 'All fields are required.', 
        message: null 
      });
    }

    const user = request.user;

    // Check if user has already applied for 2 courses (maximum limit)
    if (user.scholarshipAppliedCourses.length >= 4) {

      return response.status(400).render('scholarship-registration', { 

        error: 'You have reached the maximum limit of scholarship applications.', 
        message: null 
      });
    }

    // Check if user has previously applied to this specific course
    const existingApplication = user.scholarshipAppliedCourses.find(
      (application) => application.course.toLowerCase() === course.toLowerCase()
    );

    if (existingApplication) {
      return response.status(400).render('scholarship-registration', { 
        error: `You have already applied for the ${course} course.`, 
        message: null 
      });
    }

    // Add new scholarship application
    user.scholarshipAppliedCourses.push({ course, reason });
    
    await user.save();

    // Send confirmation email (with error handling)
    
    console.log('Scholarship application submitted successfully!');

    // Calculate remaining applications
    const remainingApplications = 2 - user.scholarshipAppliedCourses.length;
    const remainingMessage = remainingApplications > 0 
      ? ` You can apply for ${remainingApplications} more course${remainingApplications > 1 ? 's' : ''}.`
      : ' You have reached the maximum limit of scholarship applications.';

    response.status(201).render('scholarship-registration', { 
      error: null, 
      message: `Your scholarship application for the ${course} course was successful! Keep an eye on your email to hear back from us soon.` 
    });

    try {

      await scholarshipRegistrationConfirmationEmail(user.firstName, course, user.email);

      console.log('Scholarship confirmation email sent successfully!');

    } catch (emailError) {


      console.error('Failed to send confirmation email:', emailError);
      
      // Application still succeeds even if email fails
    }


  } catch (error) {
    console.error('Error submitting scholarship application:', error);
    response.status(500).render('scholarship-registration', { 
      error: 'An error occurred while submitting your application. Please try again.', 
      message: null 
    });
  }
};

// Controller that renders the scholarship application page
export const showScholarshipApplicationPage = async (request, response) => {
  try {
    response.render('scholarship-registration', { 
      message: null, 
      error: null
    });
  } catch (error) {
    console.error('Error loading scholarship application page:', error);
    response.status(500).render('scholarship-registration', { 
      error: 'There was an error loading the scholarship application page. Please try again.', 
      message: null
    });
  }
};

// Controller that redirects to the scholarship application response page

