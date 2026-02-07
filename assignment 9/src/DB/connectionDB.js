import {mongoose} from "mongoose";

const checkConnectionDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mongooseApp", { 
      serverSelectionTimeoutMS: 3000 
    });
    
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
  }
};

export default checkConnectionDB;