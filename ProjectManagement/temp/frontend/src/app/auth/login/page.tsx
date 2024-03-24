"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { backend } from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import useShowToast from "@/app/hooks/useShowToast";
import Link from "next/link";
import axios from "axios";


const Login = () => {
    //  Variables
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const router = useRouter();
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(false);


    // Reset loading state when the component rerender
    useEffect(() => {
        setIsLoading(false);
    }, []);


    //  Functions
    const handleLogin = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post(`${backend}/api/users/login`, formData, {
                headers: { "Content-Type" : "application/json" }
            });

            if(response.status === 200) {
                showToast('Success', response.data.message, 'success');
                router.push('/');
            } else {
                showToast('Error', response.data.message, 'destructive');
            }
        } catch(error) {
            showToast('Error', error, 'destructive');
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <section className="flex justify-center items-center h-screen">
            <Card className="p-4">
                <CardHeader className="font-semibold text-2xl">Login</CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <form onSubmit={handleLogin} className="flex flex-col gap-3">
                        <Input className="bg-gray-300 dark:bg-gray-900" type="email" placeholder="Enter Email" value={formData.email} onChange={(e) => setFormData((formData) => ({...formData, email: e.target.value}))} required disabled={isLoading} />
                        <Input className="bg-gray-300 dark:bg-gray-900" type="password" placeholder="Enter Password" value={formData.password} onChange={(e) => setFormData((formData) => ({...formData, password: e.target.value}))} required disabled={isLoading} />
                        <Button className="text-md font-semibold mt-2" type="submit" disabled={isLoading}>
                            {isLoading ? (<><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Wait</> ) : ("Login")}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p>Don't have an account with us? <Link className="text-red-600 font-semibold" href="/auth/signup">Sign up now!</Link></p>
                </CardFooter>
            </Card>
        </section>
    );
}

export default Login;