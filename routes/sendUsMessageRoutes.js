import express from 'express';
import { sendUsMessageLogic, getSendUsMessagePage } from '../controllers/sendUsMessageController.js';

const router = express.Router();

//Router to get the send message page.
router.get('/api/send-email', getSendUsMessagePage);

//Router to handle send message logic.
router.post('/api/send-email', sendUsMessageLogic);


export default router;
