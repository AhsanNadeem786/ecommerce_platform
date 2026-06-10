import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";


export async function POST(request: Request) {
   await dbConnect();
   try {
   const body = await request.json();
   console.log(body);
   const category = await Category.create({
    title: body.title,
    description: body.description,
   });
   if (!category) {
    return Response.json({ error: "Failed to create category" }, { status: 500 });
   }
   return Response.json({ message: "Category created successfully", data: category }, { status: 201 });
   } catch (error) {
    console.log(error);
    return Response.json({ error: "Failed to create category" }, { status: 500 });
   }
   
}
export async function GET() {
    await dbConnect();
    try {
        const categories = await Category.find();
        return Response.json({ message: "Categories fetched successfully", data: categories }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}