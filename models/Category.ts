import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
    title: string;
    description: string;
}

const categorySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});

export default mongoose.models.Category || mongoose.model<ICategory>("Category", categorySchema);