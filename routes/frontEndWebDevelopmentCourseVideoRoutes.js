import express from 'express';
import  { handleFrontEndWebDevelopmentCourseVideoAddition, getFrontEndWebDevelopmentCourseVideoAdditionPage } from '../controllers/courseVideoAdditionControllers.js';



const router = express.Router();


router.get('/api/front-end-web-development-course-video-addition', getFrontEndWebDevelopmentCourseVideoAdditionPage);

router.post('/api/front-end-web-development-course-video-addition', handleFrontEndWebDevelopmentCourseVideoAddition);

export default router;