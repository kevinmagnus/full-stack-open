import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import dotenv from 'dotenv';

dotenv.config();

const mailerSend = new MailerSend({ apiKey: process.env.API_KEY });

export async function sendEmail(toEmail, toName, subject, html) {

  const from = new Sender(process.env.EMAIL_USER, process.env.SENDER_NAME);
  
  const to = new Recipient(toEmail, toName);

  const emailParams = new EmailParams()
    .setFrom(from)
    .setTo([to])
    .setReplyTo(from)
    .setSubject(subject)
    .setHtml(html)
    .setText('Plain‑text fallback');

  await mailerSend.email.send(emailParams);
}

