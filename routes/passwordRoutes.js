import express from 'express';
import {
  showForgotPasswordPage,
  forgotPassword,
  showResetPasswordPage,
  resetPassword
} from '../controllers/passwordController.js';

const router = express.Router();

// Show forgot password form
router.get('/forgot-password', showForgotPasswordPage);

// Handle forgot password submission
router.post('/forgot-password', forgotPassword);

// Show reset password form (with token in URL)
router.get('/reset-password/:token', showResetPasswordPage);

// Handle password reset submission
router.post('/reset-password/:token', resetPassword);

export default router;
