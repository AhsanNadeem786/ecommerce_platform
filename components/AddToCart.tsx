"use client"
import { useRef, useState } from "react"
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
export default function AddToCart() {
      const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const formRef = useRef(null)
      const handleAddCart = async (e) => {
            console.log("handleAddCart")
            e.preventDefault();
            if (!name || !email || !password) {
                alert("please all field require")
            }
            try {
                const res = await fetch("/api/addcartdata", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    }),
                });
    
                if (res.ok) {
                    setName("")
                    setEmail("")
                    setPassword("")
                } else {
                    console.error("Failed to create product");
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        }
    return (
          <Dialog >

                                        <DialogTrigger asChild>
                                            <Button onClick={(e) => e.stopPropagation()} className="bg-black text-white p-3 rounded-2xl " variant="outline">Add to Cart</Button>
                                        </DialogTrigger>
                                        <DialogContent onClick={(e) => e.stopPropagation()}
                                         className="sm:max-w-sm">
                                            <DialogHeader>
                                                <DialogTitle>Please Login</DialogTitle>
                                                <DialogDescription>
                                                    Enter your name email and pasword
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleAddCart}>

                                                <FieldGroup>

                                                    <Field>
                                                        <Label htmlFor="name-1">Name</Label>
                                                        <Input id="name-1" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                                    </Field>
                                                    <Field>
                                                        <Label htmlFor="username-1">Email</Label>
                                                        <Input id="username-1" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    </Field>
                                                    <Field>
                                                        <Label htmlFor="username-1">Password</Label>
                                                        <Input id="username-1" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    </Field>
                                                </FieldGroup>
                                                <DialogFooter>

                                                    <Button type="submit">login</Button>
                                                </DialogFooter>
                                            </form>

                                        </DialogContent>
                                    </Dialog>
    )
}