import express from 'express';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const __dirname = path.resolve();



const getFrontEndWebDevelopmentCertificationFeeSubmissionPage = async (request, response) => {

    try {

        response.render('frontEndWebDevelopmentCertificationFeePaymentSubmission', { message: null, error: null, note1:  'Please never fail to complete the last step below by entering your', note2 :  'It will help our system process your payment very quickly and update your payment status instantly.'});
        
        console.log('Rendered front end web development certification fee payment submission page.');
        
    } catch (error) {
        

        console.log("Couldn't render front end web development certification fee payment submission page. There was an error", error);
    }
}

export default getFrontEndWebDevelopmentCertificationFeeSubmissionPage;