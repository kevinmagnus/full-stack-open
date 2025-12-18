import express from "express";
import sendUsMessage from "../services/sendUsMessage.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');





export const getSendUsMessagePage = async (request, response) => {

response.render('send-email');

}


export const sendUsMessageLogic = async (request, response) => {


try {

    const { name, email, subject, message } = request.body;

    await sendUsMessage(name, email, subject, message);

    console.log('Message sent successfully!');

   return response.render('send-email', { message: 'Your email was sent successfully! Look forward to hear from us sooner.', error: null})

    


    
} catch (error) {

    console.log('Error:', error);

    return response.render('send-email', { message: null, error: 'An error occured while trying to send your message. Please try again later.'});
    
}


}