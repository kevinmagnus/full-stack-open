
import User from '../models/userSignUpModel.js';
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