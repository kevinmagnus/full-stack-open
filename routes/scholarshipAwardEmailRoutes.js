import { sendDelayedAwardEmails, sendAwardEmailsForFrontend } from '../controllers/frontEndWebDevelopmentScholarshipAwardEmailControllers.js';
import  sendAwardEmailsForBackEnd from '../controllers/backEndWebDevelopmentScholarshipAwardEmailControllers.js';
import sendAwardEmailsForFullStack from '../controllers/fullStackWebDevelopmentScholarshipAwardEmailControllers.js';
import sendAwardEmailsForCybersecurity from '../controllers/cybersecurityScholarshipAwardEmailControllers.js';
import sendAwardEmailsForBlockchainDevelopment from '../controllers/blockchainDevelopmentScholarshipAwardEmailControllers.js';
import express from 'express';

const router = express.Router();

//Route to send front -end Web Development scholarship email.
router.get('/api/send-front-end-award-email', sendAwardEmailsForFrontend  );

//Route to send back -end Web Development scholarship email.
router.get('/api/send-back-end-award-email', sendAwardEmailsForBackEnd );

//Route to send full stack Web Development scholarship email.
router.get('/api/send-full-stack-award-email', sendAwardEmailsForFullStack);

//Route to send Cybersecurity scholarship email.
router.get('/api/send-cybersecurity-award-email', sendAwardEmailsForCybersecurity);

//Route to send blockchain development scholarship email.
router.get('/api/send-blockchain-development-award-email', sendAwardEmailsForBlockchainDevelopment );

router.get('/api/send-delayed-front-end-award-email', sendDelayedAwardEmails );

export default router;