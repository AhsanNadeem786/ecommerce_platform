import mongoose, { Schema, Model } from "mongoose";

interface IProduct {
  images: string[];
  name: string;
  price: number;
  quantity: number;
  categoryId: mongoose.Types.ObjectId;
  description: string;
}

const createProductSchema = new Schema<IProduct>(
  {
    images: {
      type: [String],
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

createProductSchema.virtual("isCart", {
  ref: "Cart",
  localField: "_id",
  foreignField: "ProductId",
  justOne: true,
});

const Product: Model<IProduct> =
  
  mongoose.model<IProduct>("Product", createProductSchema);

export default Product;