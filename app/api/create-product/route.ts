import dbConnect from "@/lib/dbConnect";
import product from "@/models/createproduct";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        console.log(body);
        const productData = await product.create({
            image:body.image,
            name: body.productName,
            price: body.price,
            quantity: body.quantity,
            categoryId: body.categoryId,
            description: body.description,
        });
        if (!productData) {
            return Response.json({ error: "Failed to create product" }, { status: 500 });
        }
        return Response.json({ message: "Product created successfully", data: productData }, { status: 201 });
    } catch (error) {
        console.log(error);
        
        return Response.json({ error: "Failed to create product" }, { status: 500 });

    }
    
}
 
 export async function GET() {
    await dbConnect();
    try {
        const productData = await product.find().populate("categoryId");
        return Response.json({ message: "Products fetched successfully", data: productData }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}