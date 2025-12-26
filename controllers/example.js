javascript

// utils/email.js

/*
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
const sendScholarshipAwardEmail = async (firstName, course, email) => {
    
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Code Skill Africa" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Scholarship Award Notification',
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
            
            <h2>Scholarship Award Notification</h2>
    
            <p class="greeting">Congratulations ${firstName},</p>

            <div class="message-box">
              <p>You have been awarded the scholarship for our <span class="highlight">${course}</span> program.</p>
            </div>

            <p>We are thrilled to support your journey in advancing your skills with Code Skill Africa. This scholarship covers full access to the course materials and resources.</p>
            
            <p class="note">⚠️ Please check your email regularly (including spam/junk folders) for enrollment instructions and next steps.</p>

            <p>We look forward to seeing your progress!</p>
            
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
    console.log(`Scholarship award email sent successfully to ${email}`);
  } catch (error) {
    console.error('Error sending scholarship award email:', error);
    throw new Error('Failed to send award email');
  }
};

export { sendScholarshipConfirmationEmail, sendScholarshipAwardEmail };

javascript

// models/User.js (unchanged, provided for completeness)

import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  userId: {

    type: Number,
    unique: true,
    

  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    
  },

  phoneNumber: {

    type: Number,
    required: true,

  },

  dateOfBirth: {

    type: Date,
    required: true,
  },

  country: {

type: String,
required: true,
  },

  createdAt: {
type: Date,
default: Date.now,
select: false,

  },
  
  registrationDate: {

    type: Date,
    default: Date.now

  },

  resetPasswordToken: {
    type: String,
    default: null,
    
  },

  resetPasswordExpires: {
    type: Date,
    default: null,
  
  },

  enrolledCourses: {
        type: [String],
        default: [],
    },
    scholarshipAppliedCourses: [
    
    {
        
      course: { type: String},
      reason: { type: String },
      appliedAt: { type: Date, default: Date.now },

    }

  ]

  },
  
 {
  timestamps: true
} );
userSchema.statics.generateUserId = async function() {
  try {

     const lastUser = await this.findOne({}).sort({userId: -1}).limit(1).lean();

     if (lastUser && lastUser.userId) {

      return lastUser.userId + 1;

     }

     return 100000
    
  } catch (error) {
    
    console.error('Error generating userId:', error);

    throw new Error('Failed to generate user ID');
  }
 

  
}
  
const User = mongoose.model('User', userSchema);

export default User;

javascript

// controllers/scholarshipController.js

import User from '../models/User.js';
import { sendScholarshipAwardEmail } from '../utils/email.js';

export const sendAwardEmailsForFrontend = async () => {
  try {
    const course = 'Front-End Web Development';
    const users = await User.find({ 'scholarshipAppliedCourses.course': course });

    if (users.length === 0) {
      console.log('No students found who applied for the specified course.');
      return;
    }

    for (const user of users) {
      // Confirm the user has applied for this specific course
      const application = user.scholarshipAppliedCourses.find(app => app.course === course);
      if (application) {
        await sendScholarshipAwardEmail(user.firstName, course, user.email);
      }
    }

    console.log(`Award emails sent to ${users.length} students successfully.`);
  } catch (error) {
    console.error('Error in sending award emails:', error);
    throw new Error('Failed to send award emails');
  }
};

To execute this in your application (e.g., as a script or triggered event), you can create a file like sendAwards.js:javascript

// sendAwards.js (example script to run the controller function)

import mongoose from 'mongoose';
import { sendAwardEmailsForFrontend } from './controllers/scholarshipController.js';

// Replace with your MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdbname';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await sendAwardEmailsForFrontend();
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};

run();

Run it with node sendAwards.js (assuming environment variables like EMAIL_USER, EMAIL_PASSWORD, and MONGO_URI are set). This follows the MVC pattern: Model (User schema), View (embedded in email utils as HTML templates), Controller (logic to query and send).





const userSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  userId: {

    type: Number,
    unique: true,
    

  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    
  },

  phoneNumber: {

    type: Number,
    required: true,

  },

  dateOfBirth: {

    type: Date,
    required: true,


  },

  country: {

type: String,
required: true,


  },

  createdAt: {
type: Date,
default: Date.now,
select: false,

  },
  
  registrationDate: {

    type: Date,
    default: Date.now

  },

  resetPasswordToken: {
    type: String,
    default: null,
    
  },

  resetPasswordExpires: {
    type: Date,
    default: null,
  
  },

  enrolledCourses: {
        type: [String],
        default: [],
    },
    scholarshipAppliedCourses: [
    
    {
        
      course: { type: String},
      reason: { type: String },
      appliedAt: { type: Date, default: Date.now },

    }

  ]

  },
  
 {
  timestamps: true
} );


userSchema.statics.generateUserId = async function() {


  try {

     const lastUser = await this.findOne({}).sort({userId: -1}).limit(1).lean();

     if (lastUser && lastUser.userId) {

      return lastUser.userId + 1;

     }

     return 100000
    
  } catch (error) {
    
    console.error('Error generating userId:', error);

    throw new Error('Failed to generate user ID');
  }
 

  
}
  
const User = mongoose.model('User', userSchema);

export default User;



*/
