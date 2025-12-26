import express from 'express';
import FrontEndWebDevelopmentCourseVideoModel from '../models/courseVideoModel.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


//logic to display the front -end web develpoment course video addition page.
  export const getFrontEndWebDevelopmentCourseVideoAdditionPage = async (request, response) => {


try {


    response.render('frontEndWebDevelopmentCourseVideoAddition', { message: null, error: null });

    console.log('Front end web development page displayed.');
    
} catch (error) {

    console.log('Error while loading front end web development course video addition page:', error);
    
}    

console.log('Front end web development addition page route has been hit.');
    

}





//logic to handle front end web development course video 

export const handleFrontEndWebDevelopmentCourseVideoAddition = async (request, response) => {


    try {

        

        const {  videoName, videoLink } = request.body;


if(!videoLink || !videoName) {

response.render('frontEndWebDevelopmentCourseVideoAddition', { error: 'All fields are required.'});

}

const existingVideo = await FrontEndWebDevelopmentCourseVideoModel.findOne({ videoLink });

if(existingVideo) {

    response.render('frontEndWebDevelopmentCourseVideoAddition', { error: 'A video with same link exists.', message: null });


}


const video = new FrontEndWebDevelopmentCourseVideoModel({ videoLink, videoName });

await video.save();

console.log('Video has been added successfully!');

return response.status(201).render('frontEndWebDevelopmentCourseVideoAddition', { message: 'Video was successfully added to database!', error: null});



    } catch (error) {



console.log('Error: ', error);

response.render('frontEndWebDevelopmentCourseVideoAddition', { message: null, error: 'An error occured while trying to save video. Please try again.'});
        
    }






}


export default { getFrontEndWebDevelopmentCourseVideoAdditionPage, handleFrontEndWebDevelopmentCourseVideoAddition }