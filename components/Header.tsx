"use client"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
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
import { FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { FaShoppingCart } from "react-icons/fa";
import { SearchIcon } from "lucide-react"
import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"

import { IoIosContact } from "react-icons/io";
import { useRouter } from "next/navigation";
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
    return (
        <header className=" py-7 bg-black text-white w-full ">
            <div className="h-15 w-full max-w-375 m-auto">
                <div className="flex items-center justify-between">
                    <img src="header-1.png" alt="" className="w-10 h-8" />
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

                    <Drawer direction="right">
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
                                <div className="flex mt-8 gap-8">
                                    <img src="sidebar.jpg" alt="" className="rounded-4xl" />
                                    <div className="flex-col">
                                        <p className="font-bold text-black text-3xl">Onyx</p>
                                        <p className="mt-6">Watches   </p>
                                        <p className=" mt-6">RS:1800</p>

                                    </div>
                                </div>
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
                                <Button>Create Order</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </header>
    )
}