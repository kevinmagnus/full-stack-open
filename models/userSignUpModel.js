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
