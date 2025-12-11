import express from 'express';
import {createScholarshipRegistration, showScholarshipApplicationPage, showScholarshipApplicationResponse } from "../controllers/studentScholarshipRegistrationController.js";
import { authenticate } from '../controllers/authController.js';
const router = express.Router();

router.post('/api/scholarship-registration', createScholarshipRegistration);

router.get('/api/scholarship-registration-page', showScholarshipApplicationPage);

router.get('/api/scholarship-registration-page-at-home-page', authenticate, showScholarshipApplicationPage); //This routees authenticates the user to log in at the home page before applying for the scholarship.

router.get('/api/show-application-response', showScholarshipApplicationResponse)

export default router;