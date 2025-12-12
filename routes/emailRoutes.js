import express from 'express';
import { sendMessage, emailValidation } from '../controllers/emailController.js';
import authenticate from '../controllers/authController.js';

const router = express.Router();

router.post(
  '/send-email',
  authenticate,   // ← makes sure `req.user` is populated
  emailValidation,
  sendMessage
);

export default router;
