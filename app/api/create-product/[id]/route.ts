import product from "@/models/createproduct";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
export async function DELETE(request: Request,

    { params }: { params: { id: string } }
) {
    await dbConnect()
    try {
        const { id } = await params
        
        const DeleteCaterogy = await product.findByIdAndDelete(id)
        console.log(DeleteCaterogy);
        
        if (!DeleteCaterogy) {
            return NextResponse.json({ error: "failed to deleted" }, { status: 500 })
        }

        return NextResponse.json({ Success: "caterogy was  deleted" }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "failed to deleted" }, { status: 500 })
    }
}

export async function PUT(request: Request,
    { params }: { params: { id: string } }
) {
    await dbConnect()
    try {
        const { id } = await params;
        console.log(id);
        
        const body = await request.json();
        console.log(body);
        
        const updatecaterogy =await product.findByIdAndUpdate(id,{
            name:body.name,
            price:body.price,
            quantity:body.quantity,
            categoryId:body.categoryId,
            description:body.description,
        })

        if (!updatecaterogy) {
            return Response.json({ error: "Failed to update category" }, { status: 500 });
        }
        return Response.json({ message: "Category updated successfully" }, { status: 201 });
    } catch (error) {
        console.log(error);
         return Response.json({ error: "Failed to update category" }, { status: 500 });
        
    }
}
export async function GET(request: Request,

    { params }: { params: { id: string } }) {
    await dbConnect();
    try {
          const { id } = await params
        const categories = await product.findOne();
        return Response.json({ message: "Categories fetched successfully", data: categories }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}