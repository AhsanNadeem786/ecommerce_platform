import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique:true,
    },
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
        unique: false
    },
    country: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default  mongoose.model("Address", addressSchema);