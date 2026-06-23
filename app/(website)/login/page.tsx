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
import { useEffect, useState } from "react"
export default function Login() {
    const [user,setUser] = useState({
            email:"",
            password:""

    })
      const router = useRouter()
      const handleloginform = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            console.log(response);
            if (response.ok) {
                router.push("/e-commerce")
            }
        } catch (error) {
            console.log(error);
        }
    };

return (
    <div className="flex justify-center">
        <Card className="w-full mt-10 mb-10 max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                    <Link href={"/Signup"}>
                        <Button variant="link">Sign Up</Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <form onSubmit={handleloginform}>
                <CardContent>

                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                 value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input id="password"  value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})} type="password" required />
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </CardFooter>
            </form>
        </Card>
    </div >
)
}