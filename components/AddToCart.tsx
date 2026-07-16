"use client"

import { useState } from "react";
import { Button } from "./ui/button"


export default function AddToCart(props: { productId: string, isCart: boolean }) {
 
    const { isCart } = props;
    const [loading, setloading] = useState(false)
    const [edit, setEdit] = useState(false)

    const handleAddCart = async (e: { preventDefault: () => void; } | undefined) => {
        try {
            setloading(true)
            const res = await fetch("/api/addtocart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: props.productId
                }),
            });
            if (res.ok) {
                alert("product adding to cart")
                setEdit(true)
            }

        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setloading(false)
        }
    }
    const triggerEvent = () => {
        const event = new CustomEvent("addproduct")
        window.dispatchEvent(event)
    }
    return (
        <>
            <Button onClick={async (e) => {
                e.stopPropagation();
                await handleAddCart(e)
                triggerEvent()
            }} disabled={loading || isCart || edit} >{isCart||edit ? "Already in Cart" : "Add to Cart"}</Button>
        </>
    )
}
// {Isalready?"Alredy Addred to Cart":"Add to Cart"}