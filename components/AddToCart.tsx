"use client"

import { useState } from "react";
import { Button } from "./ui/button"
// import { useSearchParams } from "next/navigation"

export default function AddToCart(props: { productId: string }) {
        const [loading,setloading] = useState(false)
    // const params = useSearchParams()
    // const id = params.get('id')


    const handleAddCart = async (e: { preventDefault: () => void; } | undefined) => {


        e.preventDefault();

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
        }finally{
            setloading(false)
        }
    }

    return (
        <>
            <Button onClick={async (e) => {
                e.stopPropagation();
                await handleAddCart(e)
            }}  disabled={loading} >Add to cart</Button>
        </>
    )
}
