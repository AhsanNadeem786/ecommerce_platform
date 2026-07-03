import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
    {
        paymentId: { type: String, required: true, ref: "payment" },
        paymentStatus: {
            type: String,
            required: true,
            enum: ['Pending', 'paid', 'Failed'],

        },

        productsId: [
            {
                Id: { type: String, required: true },
                Price: { type: Number, required: true }
            },

        ],
        amountTotal: { type: Number, required: true },
        currency: {
            type: String, required: true,

        },
        Address: {
            name: { type: String, required: true },
            lastname: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
            street: { type: String, required: true },
        },
        status: { type: String, required: true, default: "pending" },

    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
