import mongoose from "mongoose";

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

// 🔥 CRITICAL LIVE FIX: String ref ke bajaye function reference use karein 
// taake live function runtime par auto-fetch ho sake
createProductSchema.virtual('isCart', {
    ref: () => mongoose.models.Cart || "Cart", 
    localField: '_id',
    foreignField: 'ProductId',
    justOne: true
});

export default mongoose.model("Product", createProductSchema);
