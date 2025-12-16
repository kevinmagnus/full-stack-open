import express from 'express';
import {createScholarshipRegistration, showScholarshipApplicationPage } from "../controllers/studentScholarshipRegistrationController.js";
import { authenticate } from '../controllers/authController.js';

const router = express.Router();

router.post('/api/scholarship-registration', authenticate, createScholarshipRegistration);

router.get('/api/scholarship-registration', authenticate, showScholarshipApplicationPage);


export default router;