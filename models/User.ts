import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
   
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
   
    userStatus: {
        type: String,
        require:true,
        enum: ['Pending', 'Accept', 'Reject'],
        default: 'Pending'
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;