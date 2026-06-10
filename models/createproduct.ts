import mongoose from "mongoose";

const createProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    quantity: {
        type:Number,
        required:true
    },
    categoryId: {
        type:mongoose.Types.ObjectId,
        ref:'Category',
        required:true
    },
    description: {
        type:String,
        required:true
    }
},{timestamps: true});
    
export default mongoose.models.Product || mongoose.model("Product", createProductSchema);