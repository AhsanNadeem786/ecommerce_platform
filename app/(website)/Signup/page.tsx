"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function Signup() {
    const [firstName, setFirstName] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
      const router = useRouter()
    const handleUserData = async (e: React.FormEvent) => {
     
        e.preventDefault();
        if (!firstName || !lastname || !email || !password || !message) {
            alert("Please fill in all required fields");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastname,
                    email,
                    password,
                    message,

                }),
            });

            if (res.ok) {

                setFirstName("");
                setLastname("");
                setEmail("");
                setPassword("");
                setMessage("");

            } else {
                console.error("Failed to create product");
            }
            if (res.ok) {
                router.push("/login")
            }
        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex justify-center">
            <Card className="w-full mt-10 mb-10 max-w-sm">
                <CardHeader>
                    <CardTitle>Signup to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to Signup to your account
                    </CardDescription>

                </CardHeader>
                 <form onSubmit={handleUserData}>
                <CardContent>
                   
                        <div className="flex flex-col gap-6 h-100">
                            <div className="grid gap-2">
                                <Label htmlFor="email">First Name</Label>
                                <Input
                                    id="FirstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Last Name</Label>
                                <Input
                                    id="Lastname"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    type="text"
                                    placeholder="Enter your Last name"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>

                                </div>
                                <Input id="password" value={password}
                                    onChange={(e) => setPassword(e.target.value)} type="password" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Message</Label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="border "
                                    placeholder="Enter your message"
                                    required
                                />
                            </div>
                        </div>
                   
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Sign up
                    </Button>

                </CardFooter>
                 </form>
            </Card>
        </div>
    )
}