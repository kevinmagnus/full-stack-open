
/* import User from '../models/userSignUpModel.js';
import { sendScholarshipAwardEmail } from '../utils/email.js';

export const sendAwardEmailsForFrontend = async () => {
  try {
    const course = 'Front-End Web Development';
    const users = await User.find({ 'scholarshipAppliedCourses.course': course });

    if (users.length === 0) {

      console.log('No students found who applied for the specified course.');
      return ;
    }

    for (const user of users) {
      // Confirm the user has applied for this specific course
      const application = user.scholarshipAppliedCourses.find(app => app.course === course);
      if (application) {
        await sendScholarshipAwardEmail(user.firstName, course, user.email);
      }
    }

    console.log(`Award emails sent to ${users.length} students successfully for ${course}.`);
  } catch (error) {
    console.error('Error in sending award emails:', error);
    throw new Error('Failed to send award emails');
  }
};

export const sendDelayedAwardEmails = async () => {
  try {
    const course = 'Front-End Web Development'; // Focusing only on this course for now
    const now = new Date();
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    const users = await User.find({
      'scholarshipAppliedCourses': {
        $elemMatch: {
          course: course,
          appliedAt: { $lte: fiveDaysAgo },
          awardEmailSent: false
        }
      }
    });

    if (users.length === 0) {
      console.log('No eligible students found for delayed award emails for ' + course + '.');
      return;
    }

    for (const user of users) {
      const eligibleApps = user.scholarshipAppliedCourses.filter(app =>
        app.course === course &&
        app.appliedAt <= fiveDaysAgo &&
        !app.awardEmailSent
      );

      for (const app of eligibleApps) {
        await sendScholarshipAwardEmail(user.firstName, app.course, user.email);

        // Update the specific application
        await User.updateOne(
          { _id: user._id, 'scholarshipAppliedCourses._id': app._id },
          {
            $set: {
              'scholarshipAppliedCourses.$.awardEmailSent': true,
              'scholarshipAppliedCourses.$.awardEmailSentAt': new Date()
            }
          }
        );
      }
    }

    console.log(`Delayed award emails sent to ${users.length} students successfully for ${course}.`);
  } catch (error) {
    console.error('Error in sending delayed award emails:', error);
    throw new Error('Failed to send delayed award emails');
  }
};





import User from '../models/userSignUpModel.js';
import { sendScholarshipAwardEmail } from '../utils/email.js';

export const sendAwardEmailsForFrontend = async () => {
  try {
    const course = 'Front-End Web Development';
    const users = await User.find({ 'scholarshipAppliedCourses.course': course });

    if (users.length === 0) {
      console.log('No students found who applied for the specified course.');
      return;
    }

    let sentCount = 0;
    for (const user of users) {
      const eligibleApps = user.scholarshipAppliedCourses.filter(app => app.course === course && !app.awardEmailSent);
      const alreadySentApps = user.scholarshipAppliedCourses.filter(app => app.course === course && app.awardEmailSent);

      if (alreadySentApps.length > 0) {
        console.log(`Award email already sent to ${user.email} for ${course}. Skipping.`);
      }

      for (const app of eligibleApps) {
        await sendScholarshipAwardEmail(user.firstName, app.course, user.email);

        // Update the specific application
        await User.updateOne(
          { _id: user._id, 'scholarshipAppliedCourses._id': app._id },
          {
            $set: {
              'scholarshipAppliedCourses.$.awardEmailSent': true,
              'scholarshipAppliedCourses.$.awardEmailSentAt': new Date()
            }
          }
        );
        sentCount++;
      }
    }

    const totalReceived = await User.countDocuments({
      'scholarshipAppliedCourses': {
        $elemMatch: {
          course: course,
          awardEmailSent: true
        }
      }
    });

    console.log(`Award emails sent to ${sentCount} students successfully for ${course}.`);
    console.log(`Total students who have received award email for ${course}: ${totalReceived}`);
  } catch (error) {
    console.error('Error in sending award emails:', error);
    throw new Error('Failed to send award emails');
  }
};

export const sendDelayedAwardEmails = async () => {
  try {
    const course = 'Front-End Web Development'; // Focusing only on this course for now
    const now = new Date();
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    const users = await User.find({
      'scholarshipAppliedCourses': {
        $elemMatch: {
          course: course,
          appliedAt: { $lte: fiveDaysAgo },
          awardEmailSent: false
        }
      }
    });

    if (users.length === 0) {
      console.log('No eligible students found for delayed award emails for ' + course + '.');
      return;
    }

    for (const user of users) {
      const eligibleApps = user.scholarshipAppliedCourses.filter(app =>
        app.course === course &&
        app.appliedAt <= fiveDaysAgo &&
        !app.awardEmailSent
      );

      for (const app of eligibleApps) {
        await sendScholarshipAwardEmail(user.firstName, app.course, user.email);

        // Update the specific application
        await User.updateOne(
          { _id: user._id, 'scholarshipAppliedCourses._id': app._id },
          {
            $set: {
              'scholarshipAppliedCourses.$.awardEmailSent': true,
              'scholarshipAppliedCourses.$.awardEmailSentAt': new Date()
            }
          }
        );
      }
    }

    console.log(`Delayed award emails sent to ${users.length} students successfully for ${course}.`);
  } catch (error) {
    console.error('Error in sending delayed award emails:', error);
    throw new Error('Failed to send delayed award emails');
  }
};

*/



import express from 'express';
import User from '../models/userSignUpModel.js';
import { sendScholarshipAwardEmail } from '../utils/blockchainScholarshipAwardEmail.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


const sendAwardEmailsForBlockchainDevelopment = async (request, response) => {
  try {
    const course = 'Blockchain Development';
    const now = new Date();
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    const users = await User.find({ 'scholarshipAppliedCourses.course': course });

    if (users.length === 0) {
      console.log(`No students found who applied for ${course} course.`);
      return response.render('admin-scholarship-award-email-response', { error: `No students found who applied for ${course} course.`, message: null });
    }

    let sentCount = 0;
    for (const user of users) {
      const eligibleApps = user.scholarshipAppliedCourses.filter(app => 
        app.course === course && 
        app.appliedAt <= fiveDaysAgo && 
        !app.awardEmailSent
      );

      const tooSoonApps = user.scholarshipAppliedCourses.filter(app => 
        app.course === course && 
        app.appliedAt > fiveDaysAgo
      );

      const alreadySentApps = user.scholarshipAppliedCourses.filter(app => 
        app.course === course && 
        app.awardEmailSent
      );

      if (alreadySentApps.length > 0) {

        console.log(`Award email already sent to ${user.email} for ${course}. Skipping.`);

      }

      if (tooSoonApps.length > 0) {
        console.log(`Application for ${user.email} is less than 5 days ago for ${course}. Email not sent.`);
      }

      for (const app of eligibleApps) {
        await sendScholarshipAwardEmail(user.firstName, app.course, user.email);

        // Update the specific application
        await User.updateOne(
          { _id: user._id, 'scholarshipAppliedCourses._id': app._id },
          {
            $set: {
              'scholarshipAppliedCourses.$.awardEmailSent': true,
              'scholarshipAppliedCourses.$.awardEmailSentAt': new Date()
            }
          }
        );
        sentCount++;
      }
    }

    const totalReceived = await User.countDocuments({
      'scholarshipAppliedCourses': {
        $elemMatch: {
          course: course,
          awardEmailSent: true
        }
      }
    });

    console.log(`Award emails sent to ${sentCount} students successfully for ${course}.`);
    console.log(`Total students who have received award email for ${course}: ${totalReceived}`);

    return response.render('admin-scholarship-award-email-response', { message: `Award emails sent to ${sentCount} students successfully for ${course}. \n
      Total students who have received award email for ${course}: ${totalReceived}`, error: null});

  } catch (error) {

    console.error('Error in sending award emails:', error);

    return response.render('admin-scholarship-award-email-response', { error : 'An eror occured while trying to send scholarship award email', message: null });

    

    
  }
};

/*



export const sendDelayedAwardEmails = async () => {
  try {
    const course = 'Front-End Web Development'; // Focusing only on this course for now
    const now = new Date();
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    const users = await User.find({
      'scholarshipAppliedCourses': {
        $elemMatch: {
          course: course,
          appliedAt: { $lte: fiveDaysAgo },
          awardEmailSent: false
        }
      }
    });

    if (users.length === 0) {
      console.log('No eligible students found for delayed award emails for ' + course + '.');
      return;
    }

    let sentCount = 0;
    for (const user of users) {
      const eligibleApps = user.scholarshipAppliedCourses.filter(app =>
        app.course === course &&
        app.appliedAt <= fiveDaysAgo &&
        !app.awardEmailSent
      );

      for (const app of eligibleApps) {
        await sendScholarshipAwardEmail(user.firstName, app.course, user.email);

        // Update the specific application
        await User.updateOne(
          { _id: user._id, 'scholarshipAppliedCourses._id': app._id },
          {
            $set: {
              'scholarshipAppliedCourses.$.awardEmailSent': true,
              'scholarshipAppliedCourses.$.awardEmailSentAt': new Date()
            }
          }
        );
        sentCount++;
      }
    }

    const totalReceived = await User.countDocuments({
      'scholarshipAppliedCourses': {
        $elemMatch: {
          course: course,
          awardEmailSent: true
        }
      }
    });

    console.log(`Delayed award emails sent to ${sentCount} students successfully for ${course}.`);
    console.log(`Total students who have received award email for ${course}: ${totalReceived}`);
  } catch (error) {
    console.error('Error in sending delayed award emails:', error);
    throw new Error('Failed to send delayed award emails');
  }
};

*/

export default sendAwardEmailsForBlockchainDevelopment;