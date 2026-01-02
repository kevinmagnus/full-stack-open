
import mongoose from 'mongoose';

const scholarshipApplicationSchema = new mongoose.Schema({
  course: { type: String },
  reason: { type: String },
  appliedAt: { type: Date, default: Date.now },
  awardEmailSent: { type: Boolean, default: false },
  awardEmailSentAt: { type: Date, default: null }
});

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
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  registrationDate: {
    type: Date,
    default: Date.now
  },
  paidForFrontEndWebDevelopment: {

    type: Boolean,
    default: false
  },
  paidForBackEndWebDevelopment: {

    type: Boolean,
    default: false


  },
  paidForFullStackWebDevelopment: {

    type: Boolean,
    default: false,
  },
  paidForCybersecurity: {
type: Boolean,
default: false

  },
  paidForBlockchainDevelopment: {

    type: Boolean,
    default: false


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
  scholarshipAppliedCourses: [scholarshipApplicationSchema]
}, {
  timestamps: true
});

userSchema.statics.generateUserId = async function() {
  try {
    const lastUser = await this.findOne({}).sort({ userId: -1 }).limit(1).lean();
    if (lastUser && lastUser.userId) {
      return lastUser.userId + 1;
    }
    return 100000;
  } catch (error) {
    console.error('Error generating userId:', error);
    throw new Error('Failed to generate user ID');
  }
};

const User = mongoose.model('User', userSchema);

export default User;