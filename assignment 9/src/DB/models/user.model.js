import { mongoose,Types } from "mongoose";
const schema = await new mongoose.Schema({
    
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true,
        min: [18, "You must be at least 18 years old"],
        max: [100, "Age cannot exceed 100"],
    },
    phone:{
        type: String,
        required: true,
    }
    });
const User = await mongoose.model('User', schema);
export default User;