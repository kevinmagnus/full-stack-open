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

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  country: {

type: String,
required: true,


  },
  
  resetPasswordToken: {
    type: String,
    default: null
  },

  resetPasswordExpires: {
    type: Date,
    default: null
  },

  enrolledCourses: {
        type: [String],
        default: [],
    },
    scholarshipAppliedCourses: {
        type: [String],
        default: [],
    }

  },
  
 {
  timestamps: true
} );

const User = mongoose.model('User', userSchema);

export default User;
