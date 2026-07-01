import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    checkoutSessionId: {
        type: String,
        unique: true,
    },
    paymentStatus: {
        type: String,
        require:true,
        enum: ['Pending', 'paid', 'Failed'],
        default: 'Pending'
    },
    userId:{
         type: mongoose.Schema.Types.ObjectId,
         require:true,
         ref:"User"
    }


}, { timestamps: true });

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);