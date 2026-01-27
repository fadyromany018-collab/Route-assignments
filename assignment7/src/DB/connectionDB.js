import {Sequelize} from "sequelize";
export const sequelize =new Sequelize("assignment_7","root","",{
    dialect:"mysql",
    host:"127.0.0.1"
})
export const checkconnection= async()=>{
try{
    await sequelize.authenticate()
    console.log(`connection has been established successfully `);
    
}catch(error){
    console.error(`Unable to connect to the database:`,error)
}}
export const checkSyncDB=async ()=>{
    try{
        await sequelize.sync({alter:false})
        console.log(`sync has been established successfully `);
    }catch(error){
        console.error(`unable to sync to the databse:`,error)

    }
}
