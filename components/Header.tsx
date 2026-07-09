"use client"


import { SearchIcon } from "lucide-react"

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
    const handleOrder = () => {
        router.push("myorder")
    }
    const handleImg = () => {
        router.push("/e-commerce")
    }
    const handleprofile = () =>{
        router.push("/profile")
    }
    return (
        <header className=" py-7 bg-black text-white w-full">
            <div className="h-15 w-full max-w-375 m-auto">
                <div className="flex items-center justify-between">
                    <img src="header-1.png" alt="" className="w-10 h-8 cursor-pointer" onClick={handleImg} />
              
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
                    {/* <Dialog>
                        <form>
                            <DialogTrigger> <Button variant="outline"> <CgProfile /></Button></DialogTrigger>
                           
                            <DialogContent className="sm:max-w-sm">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you&apos;re
                                        done.
                                    </DialogDescription>
                                </DialogHeader>
                                <FieldGroup>
                                    <Field>
                                        <Label htmlFor="name-1">Name</Label>
                                        <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                                    </Field>
                                    <Field>
                                        <Label htmlFor="username-1">Username</Label>
                                        <Input id="username-1" name="username" defaultValue="@peduarte" />
                                    </Field>
                                </FieldGroup>
                                <DialogFooter>
                                    <DialogClose><Button variant="outline">Cancel</Button> </DialogClose>
                                    
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog> */}
                    <div onClick={handleprofile}><CgProfile /></div>
                   
                    <button onClick={handlelogout} className="bg-white text-black h-8 w-15 rounded-2xl cursor-pointer" >logout</button>
                    <button onClick={handleOrder} className="bg-white text-black h-10 w-30 rounded-2xl cursor-pointer">My Order</button>
                    <CartDrawer />
                </div>
            </div>
        </header>
    )
}