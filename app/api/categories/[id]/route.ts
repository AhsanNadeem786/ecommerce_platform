import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

// DELETE Category
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await params;

    const deleteCategory = await Category.findByIdAndDelete(id);

    if (!deleteCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

// UPDATE Category
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await params;
    const body = await request.json();

    const updateCategory = await Category.findByIdAndUpdate(
      id,
      {
        title: body.title,
        description: body.description,
      },
      {
        new: true,
      }
    );

    if (!updateCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Category updated successfully",
        data: updateCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// GET Single Category
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await params;

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Category fetched successfully",
        data: category,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}