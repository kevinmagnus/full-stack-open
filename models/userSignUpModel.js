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
    required: true
  },

  country: {

type: String,
required: true,


  },

  createdAt: {
type: Date,
default: Date.now

  },
  
  registrationDate: {

    type: Date,
    default: Date.now

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


userSchema.statics.generateUserId = async function() {

  const lastUser = await this.findOne({}, {userId: 1}).sort({userId: -1}).limit(1);

  return lastUser ? lastUser.userId + 1 : 100000;
}
  
const User = mongoose.model('User', userSchema);

export default User;
