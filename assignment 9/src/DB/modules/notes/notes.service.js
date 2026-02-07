import notes from"../../models/notes.model.js"
import User from"../../models/user.model.js"
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
export const replace=async(req ,res , next )=>{
    try {
        const { noteId } = req.params;
        const { title, content } = req.body;
        const loggedInUserId = req.loggedInUserId;

 
        const note = await notes.findById(noteId);


        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.userId.toString() !== loggedInUserId) {
            return res.status(403).json({ message: "You are not the owner" });
        }
        note.title = title;
        note.content = content;
        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
export const createNotes=async(req,res,next)=>{
            const loggedInUserId = req.loggedInUserId;
            const user = await User.findById(loggedInUserId);
            if(!user){
                res.status(401).json({message:"user doesn't exist"})
            }
            await notes.create({
            title:req.body.title,
            content:req.body.content,
            userId:loggedInUserId
            });
            res.status(200).json({message:"note created "})
}
export const notesUpdate=async(req,res,next)=>{
try {
        const { noteId } = req.params;
        const { title, content } = req.body;
        const loggedInUserId = req.loggedInUserId;

 
        const note = await notes.findById(noteId);


        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.userId.toString() !== loggedInUserId) {
            return res.status(403).json({ message: "You are not the owner" });
        }
        note.title = title;
        note.content = content;
        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

}
export const titleUpdate=async(req,res,next)=>{

    try {
        const { title } = req.body;
        const loggedInUserId = req.loggedInUserId;
        
        const Notes=await notes.find({userId:loggedInUserId})
    

        if (!Notes) {
            return res.status(404).json({ message: "Notes not found" });
        }
        const results=await notes.updateMany(
            { userId: loggedInUserId }, 
            { $set: { title: title } }
        );
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
export const deleteUser = async (req, res) => {
    try {
        const userId = req.loggedInUserId; 
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ "message": "User not found" });
        }
        res.status(200).json({ "message": "User deleted" });
    } catch (error) {
        res.status(500).json({ "message": "Server error", "error": error.message });
    }
};
export const getPaginatedNotes = async (req, res) => {
    try {
      
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const userId = req.loggedInUserId;

        const skip = (page - 1) * limit;

        const Notes = await notes.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json(Notes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.loggedInUserId; 

        const Notes = await notes.findById(id);

        
        if (!Notes) {
            return res.status(404).json({ "message": "Note not found" });
        }

        
        if (Notes.userId.toString() !== userId) {
            return res.status(403).json({ "message": "You are not the owner" });
        }

        
        res.status(200).json(Notes);
    } catch (error) {
        
        res.status(500).json({ "message": "Server error", "error": error.message });
    }
};
export const getNoteByContent = async (req, res) => {
    try {
        const { content } = req.query; 
        const userId = req.loggedInUserId;

        
        const note = await notes.findOne({ 
            userId: userId, 
            content: content 
        });

        
        if (!note) {
            return res.status(404).json({ "message": "No note found" });
        }

    
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ "message": "Server error", "error": error.message });
    }
};
export const getNotesWithUser = async (req, res) => {
    try {
        const userId = req.loggedInUserId; 

        
        const note = await notes.find({ userId })
            .populate('userId', 'email -_id') 
            .select('title userId createdAt'); 

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const aggregateNotes = async (req, res) => {
    try {
        const { title } = req.query; 
        const userId = new mongoose.Types.ObjectId(req.loggedInUserId);

        const note = await notes.aggregate([
            { $match: { userId: userId, title: title } }, 
            {
                $lookup: { 
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: { 
                    title: 1,
                    userId: 1,
                    createdAt: 1,
                    "user.name": 1,
                    "user.email": 1
                }
            }
        ]);

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const deleteAllNotes = async (req, res) => {
    try {
        const userId = req.loggedInUserId; 

        await notes.deleteMany({ userId }); 

        res.status(200).json({ "message": "Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};