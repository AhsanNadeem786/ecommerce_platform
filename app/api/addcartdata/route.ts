import dbConnect from "@/lib/dbConnect";
import addcart from "@/models/addcart";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();

        const addCart = await addcart.create({
           name:body.name,
           email:body.email,
           password:body.password
        });
        if (!addCart) {
            return Response.json({ error: "Failed to create product" }, { status: 500 });
        }
        return Response.json({ message: "Product created successfully", data: addCart }, { status: 201 });
    } catch (error) {
        console.log(error);
        
        return Response.json({ error: "Failed to create product" }, { status: 500 });

    }
    
}