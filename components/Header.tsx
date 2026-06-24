"use client"
Copy
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
                    <FaShoppingCart />
                    <Drawer direction="right">
                        <DrawerTrigger asChild>
                            <Button variant="outline">Scrollable Content</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Move Goal</DrawerTitle>
                                <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                            </DrawerHeader>
                            <div className="no-scrollbar overflow-y-auto px-4">
                                {Array.from({ length: 10 }).map((_, index) => (
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
                                ))}
                            </div>
                            <DrawerFooter>
                                <Button>Submit</Button>
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