import AddToCart from "@/components/AddToCart";
import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import Product from "@/models/createproduct";
import mongoose from "mongoose";
import React from "react";
import { notFound } from "next/navigation";

const CategoryProducts = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    // Check valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        notFound();
    }

    try {
        // IMPORTANT: Connect to MongoDB first
        await dbConnect();

        // Get category
        const categoryData = await Category.findById(id)
            .select("title")
            .lean();

        // If category doesn't exist
        if (!categoryData) {
            notFound();
        }

        // Get products
        const products = await Product.find({
            categoryId: new mongoose.Types.ObjectId(id),
        })
            .populate("categoryId", "title")
            .lean();

        return (
            <>
                <h1 className="bg-black text-white h-10 text-center mt-5">
                    {categoryData.title}
                </h1>

                {products.length === 0 ? (
                    <div className="flex justify-center items-center mt-10">
                        <p className="text-xl font-bold">
                            No products found in this category
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6 p-4">
                        {products.map((product: any) => {
                            return (
                                <div
                                    key={product._id.toString()}
                                    className="flex justify-center cursor-pointer"
                                >
                                    <div className="bg-[#f8f9fc] w-full max-w-xs rounded-3xl p-5 border border-[#00000017] shadow-xl flex flex-col gap-5 items-center justify-between">

                                        <img
                                            src={
                                                product.images?.[0] ||
                                                "/placeholder.png"
                                            }
                                            alt={product.name}
                                            className="h-60 w-60 object-contain"
                                        />

                                        <p className="text-center font-bold text-[15px]">
                                            {product.name}
                                        </p>

                                        <p className="text-center text-[14px] text-[#76767f] font-bold">
                                            {product.categoryId?.title ||
                                                "Unknown Category"}
                                        </p>

                                        <p className="text-2xl font-semibold">
                                            ${product.price}
                                        </p>

                                        <div className="flex justify-center items-center gap-4 w-full">
                                            <Button className="bg-black text-white p-3 rounded-2xl w-full max-w-30">
                                                Quick buy
                                            </Button>

                                            <AddToCart
                                                productId={product._id.toString()}
                                                isCart={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </>
        );
    } catch (error) {
        console.error("CATEGORY PAGE ERROR:", error);

        return (
            <div className="flex justify-center items-center min-h-75">
                <p className="text-red-500 font-bold">
                    Failed to load category products
                </p>
            </div>
        );
    }
};

export default CategoryProducts;