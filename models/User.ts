import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    
    firstName: {
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

export default mongoose.models.User || mongoose.model("User", userSchema);