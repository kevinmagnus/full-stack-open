import express from 'express';
import path from 'path';

const port = process.env.PORT || 4010;
const app = express();
const __dirname = path.resolve();

app.use(express.static('public'));




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


app.listen(port, '0.0.0.0', () => {

    console.log(`Server is running on port ${port}.`);

});
