import product from "@/models/createproduct";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// DELETE
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await params;

    const deleteProduct = await product.findByIdAndDelete(id);

    if (!deleteProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await params;

    const body = await request.json();

    const updateProduct = await product.findByIdAndUpdate(
      id,
      {
        name: body.name,
        price: body.price,
        quantity: body.quantity,
        categoryId: body.categoryId,
        description: body.description,
      },
      { new: true }
    );

    if (!updateProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Product updated successfully",
        data: updateProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// GET
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await params;

    const singleProduct = await product.findById(id);

    if (!singleProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Product fetched successfully",
        data: singleProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}