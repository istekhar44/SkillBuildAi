import mongoose from "mongoose";

// Connect to MongoDB connect the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");     //print the when connect 
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);   //print the error when it is not connected
    process.exit(1);
  }
};

export default connectDB;    //to use the another place 
