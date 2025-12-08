import express from 'express';
import {createScholarshipRegistration, showScholarshipApplicationPage, showScholarshipApplicationResponse } from '../controllers/studentScholarshipRegistrationController.js';

const router = express.Router();

router.post('/api/scholarship-registration', createScholarshipRegistration);

router.get('/api/scholarship-registration-page', showScholarshipApplicationPage );

router.get('/api/show-application-response', showScholarshipApplicationResponse)

export default router;