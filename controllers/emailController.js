import { validationResult, checkSchema } from 'express-validator';
import User from '../models/userSignUpModel.js';
import { sendEmail } from '../services/mailService.js';

// 1️⃣ Validation – only subject & message are required from the client
export const emailValidation = [

  checkSchema({
    subject: {
      in: ['body'],
      notEmpty: { errorMessage: 'Subject is required' },
      trim: true,
    },
    message: {
      in: ['body'],
      notEmpty: { errorMessage: 'Message body is required' },
      trim: true,
    },
  }),
];

// 2️⃣ Handler
export async function sendMessage(request, response) {

  const errors = validationResult(request);

  if (!errors.isEmpty()) {

    return response.status(400).json({ errors: errors.array() });
  }

  try {
    // `ensureAuthenticated` middleware puts the logged‑in user on `req.user`
    const userEmail = request.user?.email;

    if (!userEmail) {

      return response.status(401).json({ error: 'User not authenticated' });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return response.status(404).json({ error: 'User not found in DB' });
    }

    const toName = `${user.firstName} ${user.lastName}`;

    const html = `<p>${request.body.message}</p><hr><small>Sent from Code Skill Africa</small>`;

    await sendEmail(user.email, toName, request.body.subject, html);

    response.status(200).json({ success: true, message: 'Email sent' });

    console.log('Email sent!');

  } catch (err) {

    console.error('Email error:', err);

    response.status(500).json({ error: 'Failed to send email' });

  }
}