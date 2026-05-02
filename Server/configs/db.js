import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env');
  }

  mongoose.connection.on('connected', () => console.log('MongoDB connected successfully'));
  mongoose.connection.on('error', (error) => {
    console.log(`MongoDB connection error: ${error.message}`);
  });

  await mongoose.connect(process.env.MONGODB_URI);
}


export default connectDB;