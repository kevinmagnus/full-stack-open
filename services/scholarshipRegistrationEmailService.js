import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Correct port for TLS
    secure: false, // Use false for port 587, true for port 465
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD // Use App Password for Gmail
    }
  });
};

// Send scholarship registration confirmation email
const scholarshipRegistrationConfirmationEmail = async (firstName, course, email) => {
    
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Code Skill Africa" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Scholarship Application Received',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            text-align: center;
            background-color: #000000;
            margin: 0;
            padding: 0;
            font-family: Georgia, 'Times New Roman', Times, serif;
          }

          .address {
          
          color: teal;
          
          }

          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
          }

          .content {
            background-color: rgb(4, 67, 88);
            border: solid 3px rgb(73, 88, 102);
            border-radius: 8px;
            padding: 30px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          }

          h2 {
            color: rgb(152, 217, 219);
            margin: 10px 0 20px 0;
            font-size: 28px;
          }

          p {
            color: rgb(111, 197, 197);
            font-family: Georgia, 'Times New Roman', Times, serif;
            line-height: 1.8;
            margin: 15px 0;
            font-size: 16px;
          }

          .highlight {
            color: #00ff7f;
            font-weight: bold;
            font-style: italic;
          }

          .greeting {
            color: rgb(152, 217, 219);
            font-size: 18px;
            font-weight: bold;
          }

          .message-box {
            background-color: rgba(0, 0, 0, 0.3);
            border-left: 4px solid #00ff7f;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }

          .footer {
            background-color: black;
            padding: 20px;
            margin-top: 30px;
            border-radius: 5px;
          }

          .footer p {
            color: rgb(175, 175, 175);
            margin: 5px 0;
            font-size: 14px;
          }

          .logo {
            color: #40e0d0;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
          }

          .note {
            color: #ffd700;
            font-size: 14px;
            font-style: italic;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <div class="logo">Code Skill Africa</div>
            
            <h2>Scholarship Application Confirmation</h2>
    
            <p class="greeting">Hi ${firstName},</p>

            <div class="message-box">
              <p>We've received your application for our <span class="highlight">${course}</span> scholarship program.</p>
            </div>

            <p>Thank you for your interest in advancing your skills with Code Skill Africa. Our team will review your application carefully and get back to you soon.</p>
            
            <p class="note">⚠️ Please keep an eye on your email inbox (including spam/junk folders) for our response.</p>

            <p>We appreciate your patience during the review process.</p>
            
            <div class="footer">
              <p><strong>Best regards,</strong></p>
              <p>The Code Skill Africa Team</p>
              <p style="color: #00ff7f; margin-top: 10px;">...Building African tech innovators.</p>

              <p class='address'> 3rd floor, The CORE Building, No. 35, ICT Avenue, Cybercity, Ebene, Mauritius.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Scholarship confirmation email sent successfully to ${email}`);
  } catch (error) {
    console.error('Error sending scholarship confirmation email:', error);
    throw new Error('Failed to send confirmation email');
  }
};

export default scholarshipRegistrationConfirmationEmail;