import dbConnect from "@/lib/dbConnect"
import cart from "@/models/cart"
import { NextResponse } from "next/server"

export async function DELETE(request: Request,

    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect()
    try {
      const {id} = await params

        
        const DeleteCart = await cart.findByIdAndDelete(id)
  
   
        
        if (!DeleteCart) {
            return NextResponse.json({ error: "failed to deleted" }, { status: 500 })
        }

        return NextResponse.json({ Success: "cart was  deleted" }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "failed to deleted" }, { status: 500 })
    }
}