import { sendDelayedAwardEmails, sendAwardEmailsForFrontend } from '../controllers/scholarshipController.js';
import express from 'express';

const router = express.Router();

router.get('/api/send-front-end-award-email', sendAwardEmailsForFrontend  );

router.get('/api/send-delayed-front-end-award-email', sendDelayedAwardEmails );

export default router;