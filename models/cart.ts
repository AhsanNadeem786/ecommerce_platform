import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    UserId: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model("Cart", CartSchema);
