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
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from 'react'

const updateAddress = () => {

    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [street, setStreet] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams();
    const redirectPathName = searchParams.get("redirectUrl")

    // console.log(searchParams.get("redirectUrl"));

    const handleUpdateAddress = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            const res = await fetch("/api/address", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, lastname, city, country, street }),
            });


            const data = await res.json()
            router.push(redirectPathName ?? "/e-commerce")


        } catch (error) {
            console.log(error);

        }
    }
    const fetchAddress = async () => {
        const res = await fetch("/api/address")
        const data = await res.json()

        setName(data.data.name)
        setLastname(data.data.lastname)
        setCity(data.data.city)
        setCountry(data.data.country)
        setStreet(data.data.street)


    }
    useEffect(() => {

        fetchAddress()

    }, [])
    return (
        <div className="flex justify-center">
            <Card className="w-full mt-10 mb-10 max-w-sm">
                <CardHeader>
                    <CardTitle>Enter your address</CardTitle>


                </CardHeader>
                <form onSubmit={handleUpdateAddress}>
                    <CardContent>

                        <div className="flex flex-col gap-6 h-100">
                            <div className="grid gap-2">
                                <Label htmlFor="email"> Name</Label>
                                <Input
                                    id="FirstName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                <Label htmlFor="email">City</Label>
                                <Input
                                    id="email"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    type="text"
                                    placeholder="Enter your City"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Country</Label>

                                </div>
                                <Input id="password" value={country}
                                    onChange={(e) => setCountry(e.target.value)} type="text" placeholder="Enter your Country" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Street</Label>
                                <Input
                                    id="message"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    className="border "
                                    placeholder="Enter your street"
                                    required
                                />
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                            update
                        </Button>

                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default updateAddress