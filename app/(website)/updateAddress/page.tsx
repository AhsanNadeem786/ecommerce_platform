"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdateAddress = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");

  const router = useRouter();

  // Redirect path
  const redirectPathName = "/checkout";

  const handleUpdateAddress = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/address", {
        method: "PUT",
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

      await res.json();

      router.push(redirectPathName);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddress = async () => {
    try {
      const res = await fetch("/api/address");
      const data = await res.json();

      if (data.data) {
        setName(data.data.name || "");
        setLastname(data.data.lastname || "");
        setCity(data.data.city || "");
        setCountry(data.data.country || "");
        setStreet(data.data.street || "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div className="flex justify-center">
      <Card className="w-full mt-10 mb-10 max-w-sm">
        <CardHeader>
          <CardTitle>Enter your address</CardTitle>
        </CardHeader>

        <form onSubmit={handleUpdateAddress}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Last Name</Label>
                <Input
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Enter your last name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>City</Label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter your city"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Country</Label>
                <Input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter your country"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Street</Label>
                <Input
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Enter your street"
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              Update
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UpdateAddress;