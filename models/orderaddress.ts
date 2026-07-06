import mongoose from "mongoose";

const OrderAddressSchema = new mongoose.Schema({
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
        required: true,

    },
    country: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Order"
    }


}, { timestamps: true });

export default mongoose.models.OrderAddress || mongoose.model("OrderAddress", OrderAddressSchema);