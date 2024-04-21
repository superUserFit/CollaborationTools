"use client";

//  React libraries
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import Cookies from "js-cookies";
import Link from "next/link";
import axios from '@/app/api/api';

//  UI Components
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import ErrorMessage from "@/app/ui_components/ErrorMessage";

//  Custom components
import useShowToast from "@/app/hooks/useShowToast";
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
    const setToken = useSetRecoilState(tokenAtom);

    const [error, setError] = useState({
        isError: false,
        message: ''
    });


    // Reset loading state when the component rerender
    useEffect(() => {
        setIsLoading(false);
    }, []);


    //  Functions
    const handleLogin = async (e:any) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await axios.post('/user/login', loginData);

            if(!response.data) {
                return;
            }

            const data = response.data;
            Cookies.setItem('Infollective', JSON.stringify(data.token));
            setToken(JSON.stringify(data.token));

            setError({ isError: false, message: '' });
            showToast('Success', data.message, 'success');
            router.push('/');
        } catch(error) {
            //showToast('Error', error.response.data.message, 'error');
            setError({ isError: true, message: error.response.data.message });
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <section className="flex justify-center items-center h-screen">
            <Card className="p-4">
                {error.isError && <ErrorMessage message={error.message} />}
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