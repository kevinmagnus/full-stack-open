import express, { response } from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';


const port = process.env.PORT || 4010;
const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');






const tranporter = nodemailer.createTransport({

    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: 'chigemezuemmanuel641@gmail.com',
        pass: 'euqvaobvcrdnrots',
        },
    tls: {
        rejectUnauthorized: false
    }

});






app.get('/', (request, response) => {

    const filePath = path.join(__dirname, 'Home.html');

    response.sendFile(filePath);

});


app.get('/Testimonials', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages', 'Testimonial.html');

    response.sendFile(filePath);

});


app.get('/Sign-Up', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages', 'Sign-Up.html');

    response.sendFile(filePath);

});


app.get('/Log-In', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages', 'Log-In.html');

    response.sendFile(filePath);

});


app.get('/Front-End-Learn-More', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages', 'Front-End-Learn-More.html');

    response.sendFile(filePath);

});


app.get('/Back-End-Learn-More', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages', 'Back-End-Learn-More.html');

    response.sendFile(filePath);

});


app.get('/Front-End-Enroll', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages', 'Front-End-Enroll.html');

    response.sendFile(filePath);

});


app.get('/Back-End-Enroll', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages', 'Back-End-Enroll.html');

    response.sendFile(filePath);

});


app.get('/FullStack-Enroll', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages', 'FullStack-Enroll.html');

    response.sendFile(filePath);

});


app.get('/Our-Mission', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages', 'Our-Mission.html');

    response.sendFile(filePath);

});


app.get('/Contact-Us', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages', 'Contact-Us.html');

    response.sendFile(filePath);

});

app.get('/Payment-Success', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages', 'Payment-Success.html');

    response.sendFile(filePath);

});


app.get('/Our-Mission', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages', 'Our-Mission.html');

    response.sendFile(filePath);

});


app.get('/Admin-Home-Page', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages/Admin', 'Admin-Home-Page.html');

    response.sendFile(filePath);

});


app.get('/Admin-Dashboard', (request, response) => {

    const filePath = path.join(__dirname,'public/Pages/Admin', 'Admin-Dashboard.html');

    response.sendFile(filePath);

});



app.post('/Send-Email', (request, response) => {

    

const {first_name, last_name, email, message} = request.body;

const mailOptions = {

    from: email ,
    to: 'chigemezuemmanuel641@gmail.com',
    subject: `Code Skill Academy: Message from ${first_name} ${last_name} <br>, Email: ${email}.`,
    text: message
}




tranporter.sendMail(mailOptions, (error, info) => { 


    if(error) {


        response.render('email-error', {first_name: first_name});

        console.log(error);

        

    }else{

        response.render('email-success', {first_name: first_name});

        console.log('Email sent: '+ info.response);
    
    }


});



});









app.listen(port, '0.0.0.0', () => {

    console.log(`Server is running on port ${port}.`);

});


