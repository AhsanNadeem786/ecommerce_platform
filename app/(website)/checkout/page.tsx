"use client"

import CheckoutButton from "@/components/CheckoutButton"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"


const checkout = () => {
    const [productCart, setProductCart] = useState<any[]>([])
    const [deletecart, setdeletecart] = useState()


    const fetchCart = async () => {
        const res = await fetch("/api/storeproductcart")
        const data = await res.json()
      

        setProductCart(data.data)

    }
    useEffect(() => {

        fetchCart()

    }, [])
    const handleRemove = async (id: string) => {
        try {
            const res = await fetch(`/api/addcartdata/${id}`, {
                "method": "Delete",
            })

            const data = await res.json()



            setdeletecart(data)
            setProductCart(prev => prev.filter((data) => data._id !== id))

        } catch (error) {
            console.log(error);

        }
    }

    const [on, setOn] = useState(false)

    let sum = useMemo(() => {
        return productCart.reduce((total, cVal) => {
            return total + cVal.ProductId.price
        }, 0)
    }, [productCart])

    return <>
      
        {productCart.map((product: any) => {
            const { ProductId } = product;



            return (
                <div key={ProductId._id} className="flex mt-8 ml-8 mb-5 gap-8">

                    <img src={ProductId.images} alt="" className="rounded-4xl" />
                    <div className="flex-col">
                        <p className="font-bold text-black text-3xl">{ProductId.name}</p>

                        <p className=" mt-6">RS:{ProductId.price}</p>
                        <Button onClick={() => handleRemove(product._id)} value={deletecart} className=' mt-6'>Remove</Button>
                    </div>
                </div>
            )
        })
        }
        <div className="flex items-center justify-center">
            <p className="font-bold text-4xl">Total: {sum} </p>
          <CheckoutButton price={sum} />
        </div>
    </>
}



export default checkout