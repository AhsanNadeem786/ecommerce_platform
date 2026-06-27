import React, { useEffect, useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { FaShoppingCart } from 'react-icons/fa'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { usePathname, useRouter } from "next/navigation";

const CartDrawer = () => {
    const [productCart, setProductCart] = useState<any[]>([])
    const [deletecart,setdeletecart]= useState()
    const [deleteAllCart,setDeleteAllCart] = useState();
    const pathname = usePathname()
    const router = useRouter()
    const fetchCart = async () => {
        const res = await fetch("/api/storeproductcart")
        const data = await res.json()
        console.log(data.data);

        setProductCart(data.data)

    }
    useEffect(() => {
        fetchCart()
    }, [])
    
const handleRemove = async(id: string) =>{
     try {
                const res = await fetch(`/api/addcartdata/${id}`, {
                    "method": "Delete",
                })
    
                const data = await res.json()
         
             
                
               setdeletecart(data)
               setProductCart(prev=> prev.filter((data) => data._id !== id ))
                
            } catch (error) {
                console.log(error);
                
            }
    }
    const handleRemoveAll = async() =>{
        try {
             const res = await fetch("/api/addcartdata", {
                    "method": "Delete",
                })
    
                const data = await res.json()
         
                console.log(data);
                setDeleteAllCart(data)
                 setProductCart([])   //  setDeleteAllCart(prev=> prev.filter((data) => data.userid !== userid ))
        } catch (error) {
            console.log(error);
            
        }
    }
    const handleorder = () =>{
        router.push("/checkout")
    }
    const [open , setOpen] = useState(false)
    const cartopenChange = (open:boolean) =>{
        setOpen(open)
       if(open){
        fetchCart()
       }
        
    }
    useEffect(() => {
     if(open){
        setOpen(false)
     }
    }, [pathname])
    return (
        <Drawer open={open} onOpenChange={cartopenChange} direction="right">
            <DrawerTrigger asChild>
                <Button >   <FaShoppingCart /></Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>CART</DrawerTitle>
                    {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
                </DrawerHeader>
                <div className="no-scrollbar overflow-y-auto px-4">
                    {/* {Array.from({ length: 10 }).map((_, index) => (
                                    <p
                                        key={index}
                                        className="mb-4 leading-normal style-lyra:mb-2 style-lyra:leading-relaxed"
                                    >
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                        nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                ))} */}
                    {productCart.map((product: any) => {
                        const { ProductId } = product;
          
                
                        
                        return (
                            <div key={ProductId._id} className="flex mt-8 gap-8">

                                <img src={ProductId.images} alt="" className="rounded-4xl" />
                                <div className="flex-col">
                                    <p className="font-bold text-black text-3xl">{ProductId.name}</p>
                                    {/* <p className="mt-6">{ProductId.quantity}   </p> */}
                                    <p className=" mt-6">RS:{ProductId.price}</p>
                                  <Button onClick={() => handleRemove(product._id)} value={deletecart} className=' mt-6'>Remove</Button>
                                </div>
                            </div>
                        )
                    })}

                    <div>
                        <p className="mt-9">Order Now</p>
                        <textarea name="Order Note" id="Order Note" className="h-20 mt-6 w-80 border border-black"></textarea>
                        <Dialog>
                            <form>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="mt-8">Check your Product Selected</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-sm">
                                    {/* <DialogHeader>
                                                    <DialogTitle>Edit profile</DialogTitle>
                                                    <DialogDescription>
                                                        Make changes to your profile here. Click save when you&apos;re
                                                        done.
                                                    </DialogDescription>
                                                </DialogHeader> */}
                                    {/* <FieldGroup>
                                                    <Field>
                                                        <Label htmlFor="name-1">Name</Label>
                                                        <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                                                    </Field>
                                                    <Field>
                                                        <Label htmlFor="username-1">Username</Label>
                                                        <Input id="username-1" name="username" defaultValue="@peduarte" />
                                                    </Field>
                                                </FieldGroup> */}
                                    {/* <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter> */}
                                </DialogContent>
                            </form>
                        </Dialog>
                    </div>
                </div>
                <DrawerFooter>
                    <Button onClick={handleRemoveAll} value={deleteAllCart}>Remove All</Button>
                    <Button onClick={handleorder}>Create Order</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CartDrawer