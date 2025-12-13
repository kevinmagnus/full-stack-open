import mongoose from 'mongoose';


const counterSchema = new mongoose.Schema({

  name: String,
  count: Number,

});


const Counter = new mongoose.model('Counter', counterSchema);

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

    const counter = await Counter.findOneAndUpdate(

      { name: 'studentId' },
      {$inc: { count: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    
if(!counter.count) {

  await Counter.updateOne({ name: 'studentId' }, { count: 1000 });

  this.studentId = 1000;
}else{

  this.studentId = counter.count;
}
  
  }
  next();

});


const User = mongoose.model('User', userSchema);

//initialize the counter if it doesn't exist

( async () => {

  const counter = await Counter.findOne({ name: 'studentId'});

  if (!counter) {

    await Counter.create({ name: 'studentId', count: 999});
  }

})();



export default User;
