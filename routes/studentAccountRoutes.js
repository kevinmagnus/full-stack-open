import express from 'express';
import { createStudentAccount, getStudentCreateAccountPage } from "../controllers/createStudentAccountControllers.js";
import { studentLogInPage, studentLogIn } from '../controllers/logInStudentAcountController.js';

const router = express.Router();

//router to get show the student account creation page.
router.get('/api/Create-Account', getStudentCreateAccountPage);

//router to handle the student create account logic.
router.post('/api/Create-Account', createStudentAccount);

// router to get the student log in page.
router.get('/api/Log-In', studentLogInPage);

//router to handle the uer log in logic.
router.post('/api/Log-In', studentLogIn);

export default router;