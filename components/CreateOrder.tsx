import { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Field, FieldGroup } from './ui/field'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useRouter } from "next/navigation";
const CreateOrder = () => {
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [street, setStreet] = useState("")
    const router = useRouter()

    const handleorder = async (e: React.FormEvent) => {
 
        e.preventDefault();
        if (!name || !lastname || !city || !country || !street) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            const res = await fetch("/api/address", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    lastname,
                    city,
                    country,
                    street,

                }),
            });

            if (res.ok) {

                setName("");
                setLastname("");
                setCity("");
                setCountry("");
                setStreet("");

            } else {
                console.error("Failed to add address");
            }
            if (res.ok) {
                router.push("/checkout")
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    }
    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button variant="outline" className=" w-full bg-black text-white" type='button'>Create Order</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Enter Detail</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleorder}>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Field>
                        <Field>
                            <Label htmlFor="username-1">lastname</Label>
                            <Input id="username-1" name="username" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        </Field>
                        <Field>
                            <Label htmlFor="username-1">City</Label>
                            <Input  name="City-1" value={city} onChange={(e) => setCity(e.target.value)} />
                        </Field>
                        <Field>
                            <Label htmlFor="username-1">Country</Label>
                            <Input id="username-1" name="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                        </Field>
                        <Field>
                            <Label htmlFor="username-1">Street No</Label>
                            <Input id="username-1" name="streetno" value={street} onChange={(e) => setStreet(e.target.value)} />
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <Button type="submit"  >Create Order</Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}

export default CreateOrder