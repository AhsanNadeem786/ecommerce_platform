import dbConnect from "@/lib/dbConnect";
import user from "@/models/User";
export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
            console.log(body);
            
        const UserData = await user.create({
            
        });
        if (!UserData) {
            return Response.json({ error: "Failed to create product" }, { status: 500 });
        }
        return Response.json({ message: "Product created successfully", data: UserData }, { status: 201 });
    } catch (error) {
        console.log(error);
        
        return Response.json({ error: "Failed to create product" }, { status: 500 });

    }
    
}