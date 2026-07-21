import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
    {
        paymentId: { type: String, required: true, ref: "payment" },
        userId: { type: String, required: true, ref: "User" },
        products: [
            {
                id: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"Product" },
                price: { type: Number, required: true }
            },

        ],


        status: { type: String, required: true, default: "pending" },

    },
    { timestamps: true }
);

const Order =  mongoose.model("Order", OrderSchema);

export default Order;
