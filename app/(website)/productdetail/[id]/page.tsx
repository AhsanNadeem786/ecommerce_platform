import mongoose from "mongoose";
import productsModel from "@/models/createproduct";
import dbConnect from "@/lib/dbConnect";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import { Button } from "@/components/ui/button";

interface ProductDetailProps {
params: Promise<{
id: string;
}>;
}

const ProductDetail = async ({ params }: ProductDetailProps) => {
const { id } = await params;

// Check MongoDB ObjectId before querying database
if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
}

try {
    // Connect to MongoDB
    await dbConnect();

    // Find product
    const product = await productsModel
        .findById(id)
        .lean();

    // Product does not exist
    if (!product) {
        return notFound();
    }

    return (
        <div className="flex justify-center w-full">
            <div className="rounded-3xl mt-10 mb-5 p-5 flex flex-col gap-5 max-w-2xl w-full">

                {/* Product Image */}
                <div className="flex justify-center">
                    <img
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name || "Product"}
                        className="h-60 w-60 object-contain"
                    />
                </div>

                {/* Product Name */}
                <p className="text-center font-bold text-[15px]">
                    Name: {product.name}
                </p>

                {/* Product Price */}
                <p className="text-2xl flex justify-center">
                    Price: ${product.price}
                </p>

                {/* Buttons */}
                <div className="flex justify-center items-center gap-6">

                    <Button className="bg-black text-white p-3 rounded-2xl">
                        Quick buy
                    </Button>

                    <AddToCart
                        productId={product._id.toString()}
                        isCart={false}
                    />

                </div>

                {/* Product Description */}
                <p className="text-center text-[14px] text-[#76767f] font-bold">
                    Description: {product.description}
                </p>

            </div>
        </div>
    );
} catch (error) {
    console.error("Product detail error:", error);
    return notFound();
}

};

export default ProductDetail;