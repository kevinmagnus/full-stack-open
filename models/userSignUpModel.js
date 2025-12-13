import mongoose from 'mongoose';


const counterSchema = new mongoose.Schema({

_id: { type: String, required: true },
 sequence_value: { type: Number, default: 1000 }

});


const Counter = mongoose.model('Counter', counterSchema);

const userSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },

  studentId: {

type: Number,
unique: true,

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


userSchema.pre('save', async function(next) {


  if(this.isNew) {

    try {
      
      const counter = await Counter.findByIdAndUpdate(

      { _id: 'studentId' },
      {$inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
  

  this.studentId = counter.sequence_value;

  next();


}catch(error){

  next(error);

  console.log('Error', error);

}

  }else{

    next();

  }
    

});


const User = mongoose.model('User', userSchema);





export default User;
