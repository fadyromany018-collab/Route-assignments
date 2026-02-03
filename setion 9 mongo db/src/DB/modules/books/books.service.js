
import bookModel from "../../models/books.models.js"
import {db} from "../../connectionDB.js"
import logModel from "../../models/logs.model.js"
export const createBook = async(req,res,next)=>{

    const {title}=req.body
    if (title!=""){
   const user = await bookModel.insertOne(req.body); 
    return res.status(200).json({messsage:"done",user})}
    else{
      return res.status(400).json({messsage:"this is an empty title"})
      
    }


}
export const createAuthorImplicitly = async (req, res) => {
    try {
        const author=req.body;
        const authorModel = db.collection("authors");
         
        const result = await authorModel.insertOne(author);

        res.status(201).json({
            message: "Implicit collection 'authors' created and document inserted!",
            insertedId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const createLogsCollection = async (req,res,next) => {
    await db.createCollection("logs", { 
        capped: true, 
        size: 1048576 
    });

     res.status(200).json({messsage:"done"});
   
};
export const indexing_title =async(req,res,next)=>{
    const index= await bookModel.createIndex({title : 1})
    res.status(200).json({message:"title is indexed now",index})
}
export const insert_many=async (req,res,next)=>{
    const users=req.body
    if(users.length<3){
    const result=await bookModel.insertMany(req.body)

    res.status(200).json({message:"done",result})
    }
       res.status(401).json({message:"less than 3",result})
}
export const add_future=async (req,res,next)=>{
const result=await bookModel.updateMany(
  {},                       
  { $set: { Future: "2022" } }
);

res.status(200).json({message:"done adding future",result})
}
export const get_id=async (req,res,next)=>{
const title = req.query.title
const da_book = await bookModel.find({ title }).toArray();
console.log( da_book[0])
if(da_book!=null){
    const id = da_book[0]._id.toString()
    res.status(200).json({message:"nice id",id})
}
res.status(401).json({message:"no id the book doesn't exist"})


}

export const book_year=async (req,res,next)=>{
const from = req.query.from
const to   = req.query.to
const books = await bookModel.find({
      year: { 
        $gte: from, 
        $lte: to 
      }
}).toArray();


if(books.length===0){
    
    res.status(401).json({message:"no books in this range"})

}else{  
    
    res.status(200).json({message:"found",books})
}
  

}
export const book_genre=async (req,res,next)=>{
const genre = req.query.genre
const books = await bookModel.find({
      genre : genre
}).toArray();


if(books.length===0){
    res.status(401).json({message:"no books with this genre"})

}else{  
    
    res.status(200).json({message:"found",books})
}
  

}
export const book_skip_limit=async (req,res,next)=>{
const books = await bookModel
            .find({})
            .sort({ year: -1 }) 
            .skip(2)            
            .limit(3)           
            .toArray();
if(books.length===0){
    res.status(401).json({message:"no books with this genre"})

}else{  
    
    res.status(200).json({message:"found",books})
}
  

}
export const book_year_number=async (req,res,next)=>{
const from = Number(req.query.from)
const to   = Number(req.query.to)
const books = await bookModel.find({
      year: { 
        $gte: from, 
        $lte: to 
      }
}).toArray();


if(books.length===0){
    
    res.status(401).json({message:"no books in this range"})

}else{  
    
    res.status(200).json({message:"found",books})
}
  

}
export const book_nogenre=async (req,res,next)=>{

const books = await bookModel.find({
$and: [
    {genres: { $nin: ["horror", "science fiction"] } }
  ]
}).toArray();


if(books.length===0){
    
    res.status(401).json({message:"no books in this range"})

}else{  
    
    res.status(200).json({message:"found",books})
}
  

}
export const aggregate1=async(req,res,next)=>{
    const pipeline = [
        { $match: { year: { $gt: 2000 } } },
        { $sort: { year: -1 } }
    ];

    const books = await db.collection('books').aggregate(pipeline).toArray();
    
    const result = books.map(book => ({ ...book, _id: book._id.toString() }));
    res.status(200).json(result);

}
export const delete1 =async(req,res,next)=>{
    const yearLimit = Number(req.query.year);
    const result = await bookModel.deleteMany({
        year: { $lt: yearLimit }
    });
    res.status(200).json(result);
}

export const aggregate_projection = async (req, res) => {
    const pipeline = [
        { $match: { year: { $gt: 2000 } } },
        { 
            $project: { 
                _id: 0,      
                title: 1,    
                author: 1, 
                year: 1 
            } 
        }
    ];

    const result = await bookModel.aggregate(pipeline).toArray();
    res.status(200).json(result);
};
export const aggregate_unwind = async (req, res) => {
    const pipeline = [
        { $unwind: "$genres" }, 
        { 
            $project: { 
                _id: 0, 
                title: 1, 
                genres: 1 
            } 
        }
    ];

    const result = await bookModel.aggregate(pipeline).toArray();
    res.status(200).json(result);
};
export const aggregate_join = async (req, res) => {
    const pipeline = [
        {
            $lookup: {
                from: "books",            
                localField: "book_id",    
                foreignField: "_id",      
                as: "book_details"        
            }
        },
        {
            $project: {
                _id: 0,
                action: 1,
                "book_details.title": 1,
                "book_details.author": 1,
                "book_details.year": 1
            }
        }
    ];

    const result = await db.collection('logs').aggregate(pipeline).toArray();
    res.status(200).json(result);
};
