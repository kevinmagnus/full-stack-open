import express from 'express';
import {createScholarshipRegistration, showScholarshipApplicationPage, showScholarshipApplicationResponse } from "../controllers/studentScholarshipRegistrationController.js";
import { authenticate } from '../controllers/authController.js';
const router = express.Router();

router.post('/api/scholarship-registration', createScholarshipRegistration);

router.get('/api/scholarship-registration-page', authenticate, showScholarshipApplicationPage);

router.get('/api/show-application-response', showScholarshipApplicationResponse)

export default router;