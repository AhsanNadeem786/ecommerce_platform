import mongoose from "mongoose";

// 👇 In explicit imports se ensure hoga ke Mongoose memory mein models pehle se register hon

import cart from "@/models/cart";
import Category from "@/models/Category";

const createProductSchema = new mongoose.Schema({
    images: { type: Array, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual field for isCart population
createProductSchema.virtual('isCart', {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'ProductId',
    justOne: true
});

export default mongoose.models.Product || mongoose.model("Product", createProductSchema);
