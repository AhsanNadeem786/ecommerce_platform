import mongoose from "mongoose";

const addCartSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
   
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default  mongoose.model("AddCart", addCartSchema);