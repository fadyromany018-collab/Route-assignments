import {MongoClient} from 'mongodb'


const client = new MongoClient('mongodb://localhost:27017')
export const db= client.db("mongoApp")

export const checkConnectionDB = async() =>{
try{
    await client.connect();
    
    console.log('connected successfully to server');
     
}catch(error){
    console.log('connected failed to server',error);

}
}