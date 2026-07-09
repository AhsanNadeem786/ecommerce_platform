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

const forgotpassword = () => {
    return (
        <div className="flex justify-center items-center mt-50">
            <Card className="w-full max-w-sm ">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>
                        Enter your email address and we'll send you a link to reset your password.
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"

                                    required
                                />
                            </div>

                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Reset Password
                    </Button>
                    <Link href={"/login"}>Back to signIn</Link>
                    {/* <p>Back to signIn</p> */}
                </CardFooter>
            </Card>
        </div>
    )
}

export default forgotpassword