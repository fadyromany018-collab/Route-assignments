
import User from "../../models/user.model.js"
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
export const signup = async(req,res,next)=>{
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); 
const iv = crypto.randomBytes(16);
  try {
    const { name,email, password, phone,age } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedPhone = cipher.update(phone, 'utf8', 'hex');
    encryptedPhone += cipher.final('hex');

    await User.create({
      name,
      email,
      password: hashedPassword,
      phone: encryptedPhone,
      age
    });

    res.status(201).json({ message: "User added successfully." });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }

}
export const login = async(req,res,next)=>{
        const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user.password)
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(password,user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login successful",
      token: token
    });
}
export const updateUser=async(req,res,next)=>{
      const loggedInUserId = req.loggedInUserId;
      const {email,phone,age,name}=req.body
       const user = await User.findById(loggedInUserId);
          if(!user){
            res.status(400).json({message:"you are not the owner"})
          }
          if(email){
            const test=await User.find({email})
            if(test){
              user.email=email
            }else{
              res.status(400).json({message:"email already exist"})
            }
            
          }
          user.phone=phone
          user.age=age
          user.name=name
          await user.save()
          res.status(200).json({message:"DONE"})
           
}
export const delete_data =async(req,res,next)=>{
    try {
    const loggedInUserId = req.loggedInUserId;
    const deletedUser = await User.findByIdAndDelete(loggedInUserId);
    if (!deletedUser) {
    return res.status(401).json({ message: "User not found" });
    }

    } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    }
}
export const getUser =async(req,res,next)=>{
 try {
    const loggedInUserId = req.loggedInUserId;
    const user=await User.findById(loggedInUserId)

    if(!user){
          return res.status(401).json({ message: "user doesn't exist" });
    
    }
         return res.status(200).json({ message: "done",user});
}catch(error){
      res.status(500).json({ message: "Server error", error: error.message });
             }
}