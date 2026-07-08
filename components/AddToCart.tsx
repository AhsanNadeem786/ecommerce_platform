"use client"

import { useState } from "react";
import { Button } from "./ui/button"


export default function AddToCart(props: { productId: string }) {
    const [loading, setloading] = useState(false)
  

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
            }}  disabled={loading} >Add to cart</Button>
        </>
    )
}
