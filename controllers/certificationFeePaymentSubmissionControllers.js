import express from 'express';
import path from 'path';

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