
import {usersModel} from "../../DB/models/user.model.js"

export const createUser = async (req , res, next)=>{
    
       const existingUser = await usersModel.findOne({ where: { email: req.body.email } });
       try{
       if (existingUser) {
                    
                
                return res.status(404).json({messaage: 'Error: This email is already registered.'})
                
    }
else{
    const newUser = usersModel.build({
      name: req.body.name ,
      email:req.body.email ,
      password:req.body.password ,
      role: req.body.role 
    });
    await newUser.save();
    return res.status(200).json({messaage: 'user created'})
}
       }catch (error) {

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
       error: error.errors[0].message 
      });
    }

    res.status(500).json({ success: false, error: "Server error" });
  }

    

}
export const updateUser = async (req , res, next)=>{
  try{
  const { id } = req.params;
  const userData = { ...req.body, id: Number(id) };
    const [instance, created] = await usersModel.upsert(userData, {
      validate: false
    });
    
    if(!created){
    return res.status(200).json({messaage: 'user updated'})
    }
    else if(created){
        return res.status(400).json({messaage: 'user created',instance})
    
    }
}
    catch(error){
          return res.status(500).json({ 
      error: error.message 
    });
    }
  


}
export const findEmail = async (req , res, next)=>{

const { email } = req.query;
  const user = await usersModel.findOne({
    where: { email: email }
  });

if(user){
  res.status(200).json({messaage:"this is the user",user})
}

 res.status(404).json({messaage:"user dosen't exists"})

}
export const Pk_finder=async(req,res,next)=>{
   const { id } = req.params;
  const user = await usersModel.findOne({
    where: { id:id }
  });


  if(user){
  const userData = {  id: Number(id),name:user.name ,email:user.email,createdAt:user.createdAt,updatedAt:user.updatedAt};
  res.status(200).json({messaage:"this is the user without role ",userData})
}

   res.status(404).json({messaage:"user dosen't exists"})



}


