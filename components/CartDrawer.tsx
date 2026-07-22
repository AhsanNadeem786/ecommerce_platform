import React, { useEffect, useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { FaShoppingCart } from 'react-icons/fa'

import { usePathname, useRouter } from "next/navigation";




const CartDrawer = () => {
    const [productCart, setProductCart] = useState<any[]>([])
    const [deletecart, setdeletecart] = useState()
    const [deleteAllCart, setDeleteAllCart] = useState();
    const router = useRouter()
    const pathname = usePathname()
    const [item, setItem] = useState([])


    const fetchCart = async () => {
        try {
            const res = await fetch("/api/storeproductcart")
            const data = await res.json()

            if (data.success && data.data) {
                setProductCart(data.data)
            } else {
                console.error("Failed to fetch cart:", data.message)
                setProductCart([])
            }
        } catch (error) {
            console.error("Error fetching cart:", error)
            setProductCart([])
        }
    }
    useEffect(() => {
        fetchCart()
    }, [])

    const fetchCount = async () => {
        const res = await fetch("/api/cartcount");
        const data = await res.json();

        setItem(data.data)

    };

    useEffect(() => {

        fetchCount()
        window.addEventListener("addproduct", fetchCount)
        return () => {
            window.removeEventListener("addproduct", fetchCount)
        }
    }, []);
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
    const handleRemoveAll = async () => {
        try {
            const res = await fetch("/api/addcartdata", {
                "method": "Delete",
            })

            const data = await res.json()


            setDeleteAllCart(data)
            setProductCart([])
        } catch (error) {
            console.log(error);

        }
    }

    const [open, setOpen] = useState(false)
    const cartopenChange = (open: boolean) => {
        setOpen(open)
        if (open) {
            fetchCart()

        }

    }
    useEffect(() => {
        if (open) {
            setOpen(false)
        }
    }, [pathname])
    const handleorders = () => {

        router.push("/checkout")
    }
    return (

        <Drawer open={open} onOpenChange={cartopenChange} direction="right">

            <DrawerTrigger asChild>
                <Button className="cursor-pointer bg-white hover:bg-gray-300">
                    {item.length > 0 && (
                        <span className="bg-red-500 text-[9px] font-bold text-white p-0.5 w-4 h-4 rounded-full">
                            {item.length}
                        </span>
                    )}

                    <FaShoppingCart className="text-black" />
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                {productCart.length === 0 ? (
                    <p className="text-base text-gray-700 flex items-center">Cart item cannot be added</p>
                ) : (

                    <div className="flex flex-col h-full max-h-screen">
                        <DrawerHeader>
                            <DrawerTitle>CART</DrawerTitle>
                        </DrawerHeader>


                        <div className="no-scrollbar overflow-y-auto flex-1 px-4">
                            {productCart.map((product: any) => {
                                const { ProductId } = product;
                                return (
                                    <div key={ProductId._id} className="flex mt-8 gap-8">
                                        <img src={ProductId.images} alt="" className="rounded-4xl" />
                                        <div className="flex-col">
                                            <p className="font-bold text-black text-3xl">{ProductId.name}</p>
                                            <p className="mt-6">RS:{ProductId.price}</p>
                                            <Button onClick={() => {

                                                handleRemove(product._id)
                                                fetchCount()
                                            }
                                            } value={deletecart} className='mt-6'>Remove</Button>
                                        </div>
                                    </div>
                                );
                            })}
                            <div>
                                <p className="mt-9">Order Now</p>
                                <textarea name="Order Note" id="Order Note" className="h-20 mt-6 w-80 border border-black"></textarea>
                            </div>
                        </div>

                        <DrawerFooter>
                            <Button onClick={() => {
                                handleRemoveAll
                                fetchCount()

                            }} value={deleteAllCart} type='button'>Remove All</Button>
                            <Button variant="outline" type='button' onClick={handleorders}>Create Order</Button>
                            <DrawerClose asChild>
                                <Button variant="outline" type='button'>Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                )}
            </DrawerContent>

        </Drawer>
    )
}

export default CartDrawer

