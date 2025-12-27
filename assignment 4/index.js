const path = require("node:path")
const express = require("express")
const fs = require("fs/promises");

const app = express();
app.use(express.json());
const usersFile = path.resolve(__dirname, 'users.json');





async function readUsers() {
    const data = await fs.readFile(usersFile, "utf8");
    return JSON.parse(data);
}

async function writeUsers(users) {
    await fs.writeFile(
        usersFile,
        JSON.stringify(users, null, 2)
    );
}
//===========part 1 q1=============
app.post("/user", async (req, res) => {
    try {
        const users = await readUsers();

        const newUser = req.body;
        const emailExists = users.some(user => user.email === newUser.email);
        const idExists = users.some(user => user.id == newUser.id);
        if (emailExists ) {
            res.status(404).json({ message: "User email exists" });
        }else if(idExists){
                res.status(404).json({ message: "User id exists" });
        
        }
        else {



            users.push(newUser);

            await writeUsers(users);

            res.status(200).json({ message: "User created" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//==============part 1 q2==============
app.patch("/user/:id", async (req, res, next) => {
    const users = await readUsers();
    const { id } = req.params
    const { email, age,name } = req.body


    let idExists = users.some(user => user.id == id);
    const userIndex = users.findIndex(user => user.id == id);

    if (userIndex == -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (idExists) {
        const users = await readUsers();
        let updated = users[userIndex];
        let old = updated

        users.splice(userIndex, 1);
         updated = {
            ...old,
            name,
            email,
            age
        };
       users.splice(userIndex, 0, updated);
       await writeUsers(users);
        res.status(200).json({ message: "User age and email is updated ", user: users[userIndex] });
    }
    else {
        res.status(404).json({ message: "User ID not found" });
    }

})
//=============part 1 q3=================
app.delete("/user/:id", async (req, res, next) => {
const users = await readUsers();
const { id } = req.params
let idExists = users.some(user => user.id == id);
if (idExists){
    const userIndex = users.findIndex(user => user.id == id);
     users.splice(userIndex, 1);
     await writeUsers(users)
    res.status(200).json({ message: `User with id : ${id} is deleted` ,users});

}else{
            res.status(404).json({ message: "User ID not found" });
}



})
//==================part 1 q4================
app.get("/user/getByName",async (req, res, next) => {

const users = await readUsers();
const { name } = req.query
let nameExists = users.some(user => user.name == name);
let Userlist=[]; 
if (nameExists){
for(let x=0;x<users.length;x++){
    if (users[x].name==name){
         Userlist.push(users[x])
        
    }else{
        continue;
       
    }

}
 res.status(200).json({ message: `Users are detected` ,user: Userlist});
}
else{
res.status(404).json({ message: "User name not found" });
}

})
//============part 1 q5==================
app.get("/user",async (req, res, next) => {

const users = await readUsers();
res.status(200).json({massage:"all users",users})

})
//================part 1 q6=================
app.get("/user/filter",async(req,res,next)=>{
   const users = await readUsers();
   const minAge = Number(req.query.minAge); // convert string → number
    const Userlist = users.filter(user => user.age <= minAge);
    
    if(Userlist.length > 0){
         res.status(200).json({message:"users",Userlist})
    }
    else{
        res.status(200).json({message:"Users with such age or less are not found"})
    }


})
//===================part 1 q7======================
app.get("/user/:id",async (req, res, next) => {
    const users = await readUsers();
    const {id}=req.params
    let Exists = users.some(user => user.id == id);
    if(Exists){
           res.status(200).json({message:"users",user: users[id]})
    }
    else{
                res.status(404).json({message:`user with id: ${id} does not exists`})
    }


})
app.use((req, res) => {
  res.status(404).json({
    error: "wrong url"
  });
});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});
