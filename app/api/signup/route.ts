import dbConnect from "@/lib/dbConnect";
import user from "@/models/User";
export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();


        const UserData = await user.create({
            firstName: body.firstName,
            lastname: body.lastname,
            email: body.email,
            password: body.password,
            message: body.message,
        });
        // const exitUser = await user.findUnique({
        //     where: { email }
        // });
        // if (!exitUser) {
        //     alert("email is already exits")
        // }
        if (!UserData) {
            return Response.json({ error: "Failed to User created" }, { status: 500 });
        }
        return Response.json({ message: "User created successfully", data: UserData }, { status: 201 });
    } catch (error) {
        console.log(error);

        return Response.json({ error: "Failed to User created" }, { status: 500 });

    }

}