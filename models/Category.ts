import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    images: {
      type: [String],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;