import express from 'express';
import { getAllStudentsData, getStudentById , getStudentByIdPage } from '../controllers/showAllStudentsControllers.js';

const router = express.Router();

router.post('/get-student-by-id', getStudentById );

router.get('/get-student-by-id', getStudentByIdPage);

router.get('/get-all-student-data', getAllStudentsData);


export default router;