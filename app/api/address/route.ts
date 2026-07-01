import dbConnect from "@/lib/dbConnect";
import address from "@/models/address";

export async function POST(request: Request) {
    await dbConnect();
    
    try {
        const body = await request.json();


        const addressData = await address.create({
            name: body.name,
            lastname: body.lastname,
            city: body.city,
            country: body.country,
            street: body.street,
        });
        console.log("addressData",addressData);
        
        // const exitUser = await user.findUnique({
        //     where: { email }
        // });
        // if (!exitUser) {
        //     alert("email is already exits")
        // }
        if (!addressData) {
            return Response.json({ error: "Failed to User created" }, { status: 500 });
        }
        return Response.json({ message: "User created successfully", data: addressData }, { status: 201 });
    } catch (error) {
        console.log(error);

        return Response.json({ error: "Failed to User created" }, { status: 500 });

    }

} 