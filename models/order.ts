import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
    {
        paymentId: { type: String, required: true, ref: "payment" },


        productsId: [
            {
                Id:{type:String,require:true},
                Price:{type:Number,require:true}
            },

        ],
        amountTotal: { type: Number, required: true },
        currency: {
            type: String, required: true,

        },

        status: { type: String, required: true, default: "pending" }, 
      
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
