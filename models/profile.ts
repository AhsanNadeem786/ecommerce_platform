import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
   
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
   
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default  mongoose.model("Profile", profileSchema);