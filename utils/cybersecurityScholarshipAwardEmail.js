// utils/email.js (unchanged from previous, included for completeness)

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



// Send scholarship award email
export const sendScholarshipAwardEmail = async (firstName, course, email) => {
    
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Code Skill Africa" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Congratulations! You've Been Awarded a Scholarship!🎊" ,
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
            background-color: black;
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

          footer {
            background-color:  rgb(9, 56, 56);
            padding: 20px;
            margin-top: 30px;
            border-radius: 5px;
            color: turquoise
          }

           p {
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

          .enrollment {
          
          border: solid 3px gray;
    border-radius: 10px 0px 10px 0px;
    font-size: 25px;
    font-weight: 50px;
    color: rgb(0, 255, 179);
    width: auto;
    background-color: black;
    }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <div class="logo">Code Skill Africa</div>
            
            <h2>Scholarship Award Notification</h2>
    
            <p class="greeting">Congratulations ${firstName},</p>

            <div class="message-box">
              <p>Congratulations! 🎊 We're delighted to inform you that you've officially been awarded a <span class="highlight">Tech Scholarship</span> with <span class="highlight">Code Skill Africa</span> to study <span class="highlight">${course}</span>.</p>
            </div>

            <p>The scholarship covers 100% of your tuition <span class="highlight">(&#x20A6;318,500) </span>.</p>

            <p> <span class="highlight">Next Step - Secure Your Spot</span> </p>

            <p>To confirm your scholarship, reserve your place in the upcoming cohort starting March 25, 2026, and stand a chance to win a <span class="highlight">laptop </span>, please pay your <span class="highlight">certification fee</span> using the button below: </p>

            <a href='/'> <button class='enrollment'>Pay Certification Fee - &#x20A6;9,500 </a></button> 

            <p>Note that this scholarship spot is for a limited time.</p>
            
            
            <p>We look forward to seeing your progress and the impact you'll make in ${course}!</p>

            <p>Have any questions? Reach us on codeskillafr@gmail.com</p>
            
            
              <p><strong>Best regards,</strong></p>
              <p>The Code Skill Africa Team</p>

              
              <p style="color: #00ff7f; margin-top: 10px;">...Empowering African tech innovators.</p>

              <footer> 3rd floor, The CORE Building, No. 35, ICT Avenue, Cybercity, Ebene, Mauritius.
              </footer>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Scholarship award email sent successfully to ${email}`);
  } catch (error) {
    console.error('Error sending scholarship award email:', error);
    throw new Error('Failed to send award email');
  }
};

