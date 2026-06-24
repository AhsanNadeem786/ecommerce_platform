"use client"

import { Button } from "./ui/button"
// import { useSearchParams } from "next/navigation"

export default function AddToCart(props:{productId:string}) {
   console.log(props);
   
    // const params = useSearchParams()
    // const id = params.get('id')

    
    const handleAddCart = async () => {
   

        // e.preventDefault();
       
        try {
            const res = await fetch("/api/addtocart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                   id:props.productId
                }),
            });

           
        } catch (error) {
            console.error("Network error:", error);
        }
    }

    return (
      <>
      <Button onClick={async(e)=> {
        e.stopPropagation(); 
       await handleAddCart()
      }}  >Add to cart</Button>
      </>
    )
}
