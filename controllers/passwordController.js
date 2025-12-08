import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../models/userSignUpModel.js';
import { sendPasswordResetEmail } from '../services/emailService.js';

// Show forgot password page
export const showForgotPasswordPage = (request, response) => {

  response.render('forgot-password', { error: null, message: null });

};

// Handle forgot password request
export const forgotPassword = async (request, response) => {
    
  try {
    const { email } = request.body;

    // Validate email
    if (!email) {
      return response.render('forgot-password', { 
        error: 'Email is required',
        message: null 
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      // Don't reveal if email exists or not (security best practice)
      return response.render('forgot-password', { 
        error: null,
        message: 'If an account with that email exists, a password reset link has been sent.' 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash token before saving to database
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Save hashed token and expiration to user
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Create reset URL
    const resetUrl = `https://codeskillafricapro.onrender.com/password-reset/reset-password/${resetToken}`;

    // Send email
    try {
      await sendPasswordResetEmail(user.email, resetUrl, user.firstName);
      
      response.render('forgot-password', { 
        error: null,
        message: 'Password reset link has been sent to your email.' 
      });
    } catch (emailError) {
      // Clear token if email fails
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();

      console.error('Email sending failed:', emailError);
      response.render('forgot-password', { 
        error: 'Failed to send email. Please try again later.',
        message: null 
      });
    }

  } catch (error) {
    console.error('Forgot password error:', error);
    response.status(500).render('forgot-password', { 
      error: 'An error occurred. Please try again.',
      message: null 
    });
  }
};

// Show reset password page
export const showResetPasswordPage = async (request, response) => {
  try {
    const { token } = request.params;

    // Hash the token from URL to compare with database
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return response.render('reset-password', { 
        error: 'Password reset token is invalid or has expired.',
        token: null,
        message: null
      });
    }

    response.render('reset-password', { 
      error: null,
      token: token,
      message: null
    });

  } catch (error) {
    console.error('Reset password page error:', error);
    response.status(500).render('reset-password', { 
      error: 'An error occurred. Please try again.',
      token: null,
      message: null
    });
  }
};

// Handle password reset
export const resetPassword = async (request, response) => {
  try {
    const { token } = request.params;
    const { password, confirmPassword } = request.body;

    // Validate inputs
    if (!password || !confirmPassword) {
      return response.render('reset-password', { 
        error: 'All fields are required',
        token: token,
        message: null
      });
    }

    if (password !== confirmPassword) {
      return response.render('reset-password', { 
        error: 'Passwords do not match',
        token: token,
        message: null
      });
    }

    if (password.length < 6) {
      return response.render('reset-password', { 
        error: 'Password must be at least 6 characters long',
        token: token,
        message: null
      });
    }

    // Hash the token from URL
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return response.render('reset-password', { 
        error: 'Password reset token is invalid or has expired.',
        token: null,
        message: null
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    response.render('reset-password', { 
      error: null,
      token: null,
      message: 'Password has been reset successfully! You can now log in with your new password.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    response.status(500).render('reset-password', { 
      error: 'An error occurred. Please try again.',
      token: request.params.token,
      message: null
    });
  }
};

