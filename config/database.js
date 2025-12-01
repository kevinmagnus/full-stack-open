import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
<<<<<<< HEAD:config/database.js

=======
    
>>>>>>> 36fd917324619d0a2c15d8df328692922267b680:public/config/database.js
  try {
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    
  } catch (error) {

    console.error(`Error: ${error.message}`);
    process.exit(1);

  }

};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB Atlas database');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB Atlas');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed due to app termination');
  process.exit(0);
});

export default connectDB;
