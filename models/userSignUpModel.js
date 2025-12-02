import mongoose from "mongoose";
 
 //Define the user schema

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledCourses: [String]
});

// Create the user model
const User = mongoose.model('User', userSchema);

export default User;