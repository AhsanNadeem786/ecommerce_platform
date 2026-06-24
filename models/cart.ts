import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    
    ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Product'
    },
    UserId: {
        type: String,
        required: true
    },
   
   
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);