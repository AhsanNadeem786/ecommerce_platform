import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
   
    city: {
        type: String,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.models.Address || mongoose.model("Address", addressSchema);