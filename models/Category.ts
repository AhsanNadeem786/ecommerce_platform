import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
    images:String[];
    title: string;
    description: string;
}

const categorySchema = new Schema({
    images:{type:Array,require:true},
    title: { type: String, required: true },
    description: { type: String, required: true },
});

export default mongoose.models.Category || mongoose.model<ICategory>("Category", categorySchema);