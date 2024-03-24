"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { backend } from "@/app/api/api";
import useShowToast from "@/app/hooks/useShowToast";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";


const Signup = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        email: '',
        password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useShowToast();
    const router = useRouter();

    // Reset loading state when the component rerender
    useEffect(() => {
        setIsLoading(false);
    }, []);


    //  Functions
    const handleSignup = async () => {
        if(formData.password != confirmPassword) {
            showToast('Error', 'Password do not match', 'destructive');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`${backend}/api/users/signup`, formData, {
                headers: { "Content-Type" : "application/json" }
            });

            if(response.status === 200) {
                showToast('Success', response.data.message, 'default');
                router.push('/');
            } else {
                showToast('Error', response.data.message, 'destructive');
            }
        }catch(error) {
            showToast('Error', error, 'destructive');
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <section className="flex justify-center items-center h-screen">
            <Card className="p-4">
                <CardHeader className="font-semibold text-2xl">Sign up</CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <form action={handleSignup} className="flex flex-col gap-3">
                        <div className="flex gap-2">
                            <Input className="bg-gray-300 dark:bg-gray-900" type="text" placeholder="Enter Full Name" value={formData.full_name} onChange={(e) => setFormData((formData) => ({...formData, full_name: e.target.value}))} />
                            <Input className="bg-gray-300 dark:bg-gray-900" type="text" placeholder="Enter Username" value={formData.username} onChange={(e) => setFormData((formData) => ({...formData, username: e.target.value}))} />
                        </div>
                        <Input className="bg-gray-300 dark:bg-gray-900" type="email" placeholder="Enter Email" value={formData.email} onChange={(e) => setFormData((formData) => ({...formData, email: e.target.value}))} />
                        <div className="flex gap-2">
                            <Input className="bg-gray-300 dark:bg-gray-900" type="password" placeholder="Enter Password" value={formData.password} onChange={(e) => setFormData((formData) => ({...formData, password: e.target.value}))} />
                            <Input className="bg-gray-300 dark:bg-gray-900" type="password" placeholder="Enter Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>
                        <Button className="text-md font-semibold mt-2" type="submit" disabled={isLoading}>
                            {isLoading ? (<><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Wait</> ) : ("Signup")}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p>Have an account with us? <Link className="text-red-600 font-semibold" href="/auth/login">Login now!</Link></p>
                </CardFooter>
            </Card>
        </section>
    );
}

export default Signup;