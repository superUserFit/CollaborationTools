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
import { useSetRecoilState } from "recoil";
import useShowToast from "@/app/hooks/useShowToast";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookies";
import tokenAtom from "@/app/atoms/tokenAtom";


const Login = () => {
    //  Variables
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const router = useRouter();
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const setUser = useSetRecoilState(tokenAtom);


    // Reset loading state when the component rerender
    useEffect(() => {
        setIsLoading(false);
    }, []);


    //  Functions
    const handleLogin = async (e:any) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post(`${backend}/api/user/login`, loginData, {
                headers: { "Content-Type" : "application/json" }
            });

            const data = response.data;

            if(data.status === 200) {
                showToast('Success', data.message, 'success');
                Cookies.setItem('Infollective', JSON.stringify(data.token));
                setUser(data.token);
                router.push('/');
            } else {
                showToast('Error', data.message, 'error');
            }
        } catch(error) {
            showToast('Error', 'Error while login', 'error');
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
                        <Input autoComplete="no" className="bg-gray-300 dark:bg-gray-900" type="email" placeholder="Enter Email" value={loginData.email} onChange={(e) => setLoginData((loginData) => ({...loginData, email: e.target.value}))} required disabled={isLoading} />
                        <Input autoComplete="no" className="bg-gray-300 dark:bg-gray-900" type="password" placeholder="Enter Password" value={loginData.password} onChange={(e) => setLoginData((loginData) => ({...loginData, password: e.target.value}))} required disabled={isLoading} />
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