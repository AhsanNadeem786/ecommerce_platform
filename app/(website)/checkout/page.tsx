"use client"

import CheckoutButton from "@/components/CheckoutButton"
import CreateOrder from "@/components/CreateOrder"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

import { useEffect, useMemo, useState } from "react"


const checkout = () => {
    const [productCart, setProductCart] = useState<any[]>([])
    const [deletecart, setdeletecart] = useState()
    const router = useRouter()
    const [showAddress, setShowAddress] = useState(null);

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

    const handleAddress = () => {
        router.push("/updateAddress?redirectUrl=/checkout")
    }
    const fetchAddress = async () => {
        const res = await fetch("/api/address")
        const data = await res.json()

        setShowAddress(data.data)

    }
    useEffect(() => {

        fetchAddress()

    }, [])
    let sum = useMemo(() => {
        return productCart.reduce((total, cVal) => {
            return total + cVal.ProductId.price
        }, 0)
    }, [productCart])
    const handleEdit = () => {
        router.push("/updateAddress?redirectUrl=/checkout")
    }
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

        <div className="overflow-x-auto">
            {showAddress ?
                <table className="w-275 ml-50  border border-gray-300 shadow-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="border px-4 py-3"> Name</th>
                            <th className="border px-4 py-3">LastName</th>
                            <th className="border px-4 py-3">City</th>
                            <th className="border px-4 py-3">country</th>
                            <th className="border px-4 py-3">Street</th>
                            <th className="border px-4 py-3">Actions</th>

                        </tr>
                    </thead>

                    <tbody>
                        <tr className="text-center">

                            <td className="border px-4 py-3">
                                {showAddress.name}
                            </td>

                            <td className="border px-4 py-3">
                                {showAddress.lastname}
                            </td>
                            <td className="border px-4 py-3">
                                {showAddress.city}
                            </td>
                            <td className="border px-4 py-3">
                                {showAddress.country}
                            </td>
                            <td className="border px-4 py-3">
                                {showAddress.street}
                            </td>

                            <td className="border px-4 py-3">
                                <div className="flex justify-center gap-3">


                                    <button
                                        onClick={() => handleEdit()}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </td>



                        </tr>
                    </tbody>
                </table> : ""}

        </div>
        <div className="flex flex-col items-center justify-center gap-8">
            {/* <CreateOrder /> */}
            <p className="font-bold text-4xl mt-6">Total: {sum} </p>
            {!showAddress &&
                <Button onClick={handleAddress} className="w-50 h-15 rounded-4xl">Add Shiping Address</Button>
            }
            <CheckoutButton disabled={!showAddress} />
        </div>

    </>
}



export default checkout