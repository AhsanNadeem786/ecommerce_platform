import dbConnect from "@/lib/dbConnect";
import cart from "@/models/cart";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface ICartData {
    ProductId: string;
    UserId: string;
}

export async function POST(request: Request) {
    try {
        // Connect MongoDB
        await dbConnect();

        // Get cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        // Check token
        if (!token) {
            return Response.json(
                {
                    error: "Please login first",
                },
                {
                    status: 401,
                }
            );
        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            "screct-key"
        ) as {
            userId: string;
        };

        // Get request body
        const body = await request.json();

        // Check product ID
        if (!body.id) {
            return Response.json(
                {
                    error: "Product ID is required",
                },
                {
                    status: 400,
                }
            );
        }

        // Create cart data
        const CartData: ICartData = {
            ProductId: body.id,
            UserId: decoded.userId,
        };

        // Save cart
        const savedCart = await cart.create(CartData);

        // Check saved cart
        if (!savedCart) {
            return Response.json(
                {
                    error: "Failed to add cart",
                },
                {
                    status: 500,
                }
            );
        }

        return Response.json(
            {
                message: "Cart data saved successfully",
                data: savedCart,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("Add to cart error:", error);

        return Response.json(
            {
                error: "Failed to add cart",
            },
            {
                status: 500,
            }
        );
    }
}