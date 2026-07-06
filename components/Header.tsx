"use client"


import { SearchIcon } from "lucide-react"
import {
    Field,
  

} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"

import { IoIosContact } from "react-icons/io";
import { useRouter } from "next/navigation";
import CartDrawer from "./CartDrawer"
export default function Header() {
    const router = useRouter()
    const handlelogout = async () => {
        try {
            const res = await fetch("/api/logout", {
                method: "POST",
            })
            if (res.ok) {
                router.push("/login")
            }

        } catch (error) {
            console.log(error);

        }
    }
    const handleOrder = () =>{
        router.push("myorder")
    }
    const handleImg = ()=>{
        router.push("/e-commerce")
    }
    return (
        <header className=" py-7 bg-black text-white w-full">
            <div className="h-15 w-full max-w-375 m-auto">
                <div className="flex items-center justify-between">
                    <img src="header-1.png" alt="" className="w-10 h-8" onClick={handleImg} />
                    <IoIosContact size={14} className="text-white   " />
                    <Field className="max-w-sm">
                        {/* <FieldLabel htmlFor="inline-start-input">Input</FieldLabel> */}
                        <InputGroup>
                            <InputGroupInput id="inline-start-input" placeholder="Search..." />
                            <InputGroupAddon align="inline-start">
                                <SearchIcon className="text-muted-foreground" />
                            </InputGroupAddon>
                        </InputGroup>
                        {/* <FieldDescription>Icon positioned at the start.</FieldDescription> */}
                    </Field>
                    <button onClick={handlelogout} className="bg-white text-black h-8 w-15 rounded-2xl cursor-pointer" >logout</button>
                    <button onClick={handleOrder} className="bg-white text-black h-10 w-30 rounded-2xl cursor-pointer">My Order</button>
                  <CartDrawer />
                </div>
            </div>
        </header>
    )
}