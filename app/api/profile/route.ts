import dbConnect from "@/lib/dbConnect";
import profile from "@/models/profile";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();


        const ProfileData = await profile.create({
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            password: body.password,
            message: body.message,
        });
      
        if (!ProfileData) {
            return Response.json({ error: "Failed to User created" }, { status: 500 });
        }
        return Response.json({ message: "User created successfully", data: ProfileData }, { status: 201 });
    } catch (error) {
        console.log(error);
        alert("email is already exits")
        return Response.json({ error: "Failed to User created" }, { status: 500 });

    }

}


export async function GET() {
    await dbConnect();
    try {
        const profiles = await profile.find();
        console.log(profiles);
        
        return Response.json({ message: "Categories fetched successfully", data: profiles }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}