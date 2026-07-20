import mongoose from "mongoose";
import Category from "@/models/Category";// 👈 Live server ke liye registration lazmi hai
import cart from "@/models/cart";   // 👈 Live server ke liye registration lazmi hai

const createProductSchema = new mongoose.Schema({
    images: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual field definition for isCart
createProductSchema.virtual('isCart', {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'ProductId',
    justOne: true
});

export default mongoose.models.Product || mongoose.model("Product", createProductSchema);
