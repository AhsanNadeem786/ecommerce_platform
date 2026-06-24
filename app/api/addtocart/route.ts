import dbConnect from "@/lib/dbConnect";
import cart from "@/models/cart";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
interface ICartData {
  ProductId:String ;
  userId:String;
}
export async function POST(request: Request) {

    await dbConnect
   
        const cokkieStore = await cookies()
        const token = cokkieStore.get("token")?.value
       
        if (!token) throw new Error("No token found");


        const decoded = jwt.verify(token,'screct-key')
    console.log("decoded",decoded);
    
        
 try {
        const body = await request.json()
        // console.log(body);
        console.log(body);

        
        const CartData:ICartData = await cart.create({
            ProductId: body.id,
            UserId: decoded.userId,
           
        })
         if(!CartData) {
                return Response.json({ error: "Failed to add cart" }, { status: 500 });
            }
        return Response.json({ message: "Cart data Saved Successfully", data: CartData }, { status: 201 });
    } catch (error) {
        console.log(error);

    }
}