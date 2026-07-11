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
import { useRouter } from "next/navigation"
import { useState } from "react"

const profile = () => {
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleprofilesubmit = async (e: { preventDefault: () => void }) => {
        debugger
        e.preventDefault();
        if (!name || !lastname || !email || !password || !message) {
            alert("Please fill in all required fields");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    lastname,
                    email,
                    password,
                    message,

                }),
            });

            if (res.ok) {

                setName("");
                setLastname("");
                setEmail("");
                setPassword("");
                setMessage("");

            } else {
                console.error("Failed to create product");
            }

        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setLoading(false);
        }
    }
    const handleroute = () =>{
        router.push("/e-commerce")
    }
    return (
        <div className="flex  justify-center mt-15">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>please login to create account</CardTitle>
                </CardHeader>
                <form onSubmit={handleprofilesubmit}>
                    <CardContent>

                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="name">Name</Label>

                                    </div>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Last Name</Label>

                                    </div>
                                    <Input
                                        id="lastname"
                                        type="text"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        required />
                                </div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>

                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            <div className="grid gap-2 ">
                                <div className="flex items-center ">
                                    <Label htmlFor="password">Message</Label>

                                </div>
                                <textarea
                                    id="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className="border border-gray-200" />
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" disabled={loading} onClick={handleroute} className="w-full">
                            {loading ? "loading...." : "Login to create account"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div >
    )
}

export default profile




