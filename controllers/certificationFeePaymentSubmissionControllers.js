import express from 'express';
import path from 'path';
import User from '../models/userSignUpModel.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const __dirname = path.resolve();



export const getFrontEndWebDevelopmentCertificationFeeSubmissionPage = async (request, response) => {

    try {

        response.render('frontEndWebDevelopmentCertificationFeePaymentSubmission', { message: null, error: null, note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'});
        
        console.log('Rendered front end web development certification fee payment submission page.');
        
    } catch (error) {
        

        console.log("Couldn't render front end web development certification fee payment submission page. There was an error", error);
    }
}


export const getBackEndWebDevelopmentCertificationFeeSubmissionPage = async (request, response) => {

    try {

        response.render('backEndWebDevelopmentCertificationFeePaymentSubmission', { message: null, error: null, note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'});
        
        console.log('Rendered back end web development certification fee payment submission page.');
        
    } catch (error) {
        

        console.log("Couldn't render back end web development certification fee payment submission page. There was an error", error);
    }
}




export const getFullStackWebDevelopmentCertificationFeeSubmissionPage = async (request, response) => {

    try {

        response.render('fullStackWebDevelopmentCertificationFeePaymentSubmission', { message: null, error: null, note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'});
        
        console.log('Rendered full stack web development certification fee payment submission page.');
        
    } catch (error) {
        

        console.log("Couldn't render full stack web development certification fee payment submission page. There was an error", error);
    }
}



export const getCybersecurityCertificationFeeSubmissionPage = async (request, response) => {

    try {

        response.render('cybersecurityCertificationFeePaymentSubmission', { message: null, error: null, note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'});
        
        console.log('Rendered cybersecurity certification fee payment submission page.');
        
    } catch (error) {
        

        console.log("Couldn't render cybersecurity certification fee payment submission page. There was an error", error);
    }
}



export const getBlockchainDevelopmentCertificationFeeSubmissionPage = async (request, response) => {

    try {

        response.render('blockchainDevelopmentCertificationFeePaymentSubmission', { message: null, error: null, note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'});
        
        console.log('Rendered blockchain development certification fee payment submission page.');
        
    } catch (error) {
        

        console.log("Couldn't render blockchain development certification fee payment submission page. There was an error", error);
    }
}








    
export const updateFrontEndPayment = async (request, response) => {


  try {

    const { email } = request.body;

    // Validate email is provided
    if (!email) {

      return response.status(400).render('frontEndWebDevelopmentCertificationFeePaymentSubmission', { message: null, error: 'Email address is required', note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'  });
    }

    // Find user and update payment status
    const user = await User.findOne({ email});

    // Check if user exists
    if (!user) {
      return response.status(404).render('frontEndWebDevelopmentCertificationFeePaymentSubmission', { 
        message: null, 
        error: 'The email address you entered is not associated with any account. Re-check email and try again.' ,
        note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'
      });
    }



    if(user.paidForFrontEndWebDevelopment) {

      console.log('User has already paid for Front-End Web Development');

      return response.render('frontEndWebDevelopmentCertificationFeePaymentSubmission', )


    }

    console.log(`Payment status updated for user: ${user.email} (Student ID: ${user.userId})`);

    return response.status(200).render('frontEndWebDevelopmentCertificationFeePaymentSubmission', { 
      error: null, 

      message: "Your certification fee payment for Front-End Web Development course was received successfully! You'll receive an email from us shortly for next steps towards your tech journey.",
      note1:  'Please never fail to ete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'

    });

  } catch (error) {

    console.error('Error updating front-end web development payment status:', error);

    return response.status(500).render('frontEndWebDevelopmentCertificationFeePaymentSubmission', { 
      message: null , 
      error: 'An error occurred while tracking your payment. Please enter your account email again.', 
      note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'
    });
  }


};



export const updateBackEndPayment = async (request, response) => {


  try {

    const { email } = request.body;

    // Validate email is provided
    if (!email) {

      return response.status(400).render('backEndWebDevelopmentCertificationFeePaymentSubmission', { message: null, error: 'Email address is required', note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'  });
    }

    // Find user and update payment status
    const user = await User.findOneAndUpdate(

      { email: email.trim().toLowerCase() },
      { paidForBackEndWebDevelopment: true },

      { new: true } // Returns the updated document
    );

    // Check if user exists
    if (!user) {
      return response.status(404).render('backEndWebDevelopmentCertificationFeePaymentSubmission', { 
        message: null, 
        error: 'No user found with that email address' ,
        note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'
      });
    }

    console.log(`Payment status updated for user: ${user.email} (Student ID: ${user.userId})`);

    return response.status(200).render('backEndWebDevelopmentCertificationFeePaymentSubmission', { 
      error: null, 

      message: "Your certification fee payment for Back-End Web Development course was received successfully! You'll receive an email from us shortly for next steps towards your tech journey.",
      note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'

    });

  } catch (error) {

    console.error('Error updating back-end web development payment status:', error);

    return response.status(500).render('backEndWebDevelopmentCertificationFeePaymentSubmission', { 
      message: null , 
      error: 'An error occurred while tracking your payment. Please enter your account email again.', 
      note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'
    });
  }


};



export const updateFullStackPayment = async (request, response) => {


  try {

    const { email } = request.body;

    // Validate email is provided
    if (!email) {

      return response.status(400).render('fullStackWebDevelopmentCertificationFeePaymentSubmission', { message: null, error: 'Email address is required', note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'  });
    }

    // Find user and update payment status
    const user = await User.findOneAndUpdate(

      { email: email.trim().toLowerCase() },
      { paidForFullStackWebDevelopment: true },

      { new: true } // Returns the updated document
    );

    // Check if user exists
    if (!user) {
      return response.status(404).render('fullStackWebDevelopmentCertificationFeePaymentSubmission', { 
        message: null, 
        error: 'No user found with that email address' ,
        note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'
      });
    }

    console.log(`Payment status updated for user: ${user.email} (Student ID: ${user.userId})`);

    return response.status(200).render('fullStackWebDevelopmentCertificationFeePaymentSubmission', { 
      error: null, 

      message: "Your certification fee payment for Full Stack Web Development course was received successfully! You'll receive an email from us shortly for next steps towards your tech journey.",
      note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'

    });

  } catch (error) {

    console.error('Error updating Full Stack Web development payment status:', error);

    return response.status(500).render('fullStackWebDevelopmentCertificationFeePaymentSubmission', { 
      message: null , 
      error: 'An error occurred while tracking your payment. Please enter your account email again.', 
      note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'
    });
  }


};



export const updateCybersecurityPayment = async (request, response) => {


  try {

    const { email } = request.body;

    // Validate email is provided
    if (!email) {

      return response.status(400).render('cybersecurityCertificationFeePaymentSubmission', { message: null, error: 'Email address is required', note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'  });
    }

    // Find user and update payment status
    const user = await User.findOneAndUpdate(

      { email: email.trim().toLowerCase() },
      { paidForCybersecurity: true },

      { new: true } // Returns the updated document
    );

    // Check if user exists
    if (!user) {
      return response.status(404).render('cybersecurityCertificationFeePaymentSubmission', { 
        message: null, 
        error: 'No user found with that email address' ,
        note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'
      });
    }

    console.log(`Payment status updated for user: ${user.email} (Student ID: ${user.userId})`);

    return response.status(200).render('cybersecurityCertificationFeePaymentSubmission', { 
      error: null, 

      message: "Your certification fee payment for Cybersecurity course was received successfully! You'll receive an email from us shortly for next steps towards your tech journey.",
      note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'

    });

  } catch (error) {

    console.error('Error updating Cybersecurity payment status:', error);

    return response.status(500).render('cybersecurityCertificationFeePaymentSubmission', { 
      message: null , 
      error: 'An error occurred while tracking your payment. Please enter your account email again.', 
      note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'
    });
  }


};



export const updateBlockchainDevelopmentPayment = async (request, response) => {


  try {

    const { email } = request.body;

    // Validate email is provided
    if (!email) {

      return response.status(400).render('blockchainDevelopmentCertificationFeePaymentSubmission', { message: null, error: 'Email address is required', note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'  });
    }

    // Find user and update payment status
    const user = await User.findOneAndUpdate(

      { email: email.trim().toLowerCase() },
      { paidForBlockchainDevelopment: true },

      { new: true } // Returns the updated document
    );

    // Check if user exists
    if (!user) {
      return response.status(404).render('blockchainDevelopmentCertificationFeePaymentSubmission', { 
        message: null, 
        error: 'No user found with that email address' ,
        note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'
      });
    }

    console.log(`Payment status updated for user: ${user.email} (Student ID: ${user.userId})`);

    return response.status(200).render('blockchainDevelopmentCertificationFeePaymentSubmission', { 
      error: null, 

      message: "Your certification fee payment for Blockchain Development course was received successfully! You'll receive an email from us shortly for next steps towards your tech journey.",
      note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'

    });

  } catch (error) {

    console.error('Error updating Blockchain Development payment status:', error);

    return response.status(500).render('blockchainDevelopmentCertificationFeePaymentSubmission', { 
      message: null , 
      error: 'An error occurred while tracking your payment. Please enter your account email again.', 
      note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'
    });
  }


};
