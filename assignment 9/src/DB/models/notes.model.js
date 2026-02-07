import { mongoose,Types } from "mongoose";
const schema = await new mongoose.Schema({
    
    
    title: {
        type: String,
        required: true,
        trim: true,
        validator: function(value) {
               return value !== value.toUpperCase();
            },
                message: `The title  cannot be entirely uppercase. Please use mixed case.`    
     }
    ,
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: Types.ObjectId, 
        ref: "User",          
        required: [true, "Note must belong to a user"]
    }
    },{
        timestamps:true
    });
const notes = await mongoose.model('note', schema);
export default notes;