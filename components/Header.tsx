"use client"



import { MenuIcon, SearchIcon, XIcon } from "lucide-react"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoIosContact } from "react-icons/io";
import { useRouter } from "next/navigation";
import CartDrawer from "./CartDrawer"
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react"
export default function Header() {
    const [isScrolled, setisScrolled] = useState(false)
    const [isopen, setIsopen] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setisScrolled(true)
            } else {
                setisScrolled(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
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
    const handleOrder = () => {
        router.push("myorder")
    }
    const handleImg = () => {
        router.push("/e-commerce")
    }
    const handleprofile = () => {
        router.push("/profile")
    }
    const toggleMenu = () => setIsopen(!isopen);
    return (
        <header className={`      sticky top-0 z-50 py-5 ${!!isScrolled ? 'bg-mist-950 z-50' : 'bg-black'}`}>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <img src="header-1.png" alt="Logo" className="w-13 h-10 cursor-pointer" onClick={handleImg} />

                <Field className="hidden md:block max-w-sm text-white">          <InputGroup>
                    <InputGroupInput className="placeholder:text-white" id="inline-start-input" placeholder="Search..." />
                    <InputGroupAddon align="inline-start">
                        <SearchIcon className="text-muted-foreground" />
                    </InputGroupAddon>
                </InputGroup>
                </Field>

                <div className="hidden md:flex items-center gap-6">
                    <div className="bg-white hover:bg-gray-300 p-1.5 rounded-2xl cursor-pointer" onClick={handleprofile}>
                        <CgProfile className="text-blue-900 font-bold text-xl" />
                    </div>
                    <Button onClick={handlelogout} className="bg-red-500 px-6 py-2 font-mono hover:bg-red-700 text-white h-10 rounded-2xl cursor-pointer">
                        Logout
                    </Button>
                    <Button onClick={handleOrder} className="bg-white hover:bg-gray-300 text-black h-10 px-6 rounded-2xl cursor-pointer">My Order</Button>
                    <CartDrawer />
                </div>


                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white p-2 focus:outline-none" >
                        {isopen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {isopen && (
                <div className="md:hidden bg-black text-white px-4 pt-2 pb-6 space-y-4 border-t border-gray-800 mt-5">
                    <Field className="w-full text-white">
                        <InputGroup>
                            <InputGroupInput className="placeholder:text-white w-full" placeholder="Search..." />
                        </InputGroup>
                    </Field>



                    <div className="flex flex-col gap-3">
                        <Button className="flex items-center w-full py-5 bg-white gap-2 cursor-pointer" onClick={handleprofile}>
                            <CgProfile className="text-4xl text-black" /> <span className="text-black text-2xl font-bold">Profile</span>
                        </Button>
                        <Button onClick={handleOrder} className=  "bg-white text-black h-10 w-full rounded-2xl py-5 font-bold text-xl">
                            My Order
                        </Button>
                        <CartDrawer className="w-full" />
                        <Button onClick={handlelogout} className="bg-red-500 text-white h-10 w-full rounded-2xl font-bold text-[12px]">
                            Logout
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}




