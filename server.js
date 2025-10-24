import express from 'express';
import path from 'path';

const port = process.env.PORT || 4010;
const app = express();
const __dirname = path.resolve();

app.use(express.static('public'));
app.use(express.static('public/Stylesheet'));



app.get('/', (request, response) => {

    const filePath = path.join(__dirname, 'Home.html');

    response.sendFile(filePath);

});


app.listen(port, '0.0.0.0', () => {

    console.log(`Server is running on port ${port}.`);

});
