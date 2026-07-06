import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
    {
        paymentId: { type: String, required: true, ref: "payment" },
        userId: { type: String, required: true, ref: "User" },
        products: [
            {
                id: { type: String, required: true },
                price: { type: Number, required: true }
            },

        ],


        status: { type: String, required: true, default: "pending" },

    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
