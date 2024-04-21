"use client";

//  React libraries
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "@/app/api/api";

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


const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useShowToast();
    const router = useRouter();
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
    const handleSignup = async () => {
        if(formData.password != confirmPassword) {
            setError({ isError: true, message: 'Password do not match.' });
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post('/user/signup', formData);

            if(!response.data) {
                return;
            }

            const data = response.data;

            showToast('Success', data.message, 'success');
            setError({ isError: false, message: '' });

            setToken(JSON.stringify(data.token));
            router.push('/');
        }catch(error) {
            setError({ isError: true, message: error.response.data.message });
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <section className="flex justify-center items-center h-screen">
            <Card className="p-4">
                {error.isError && <ErrorMessage message={error.message} />}
                <CardHeader className="font-semibold text-2xl">Sign up</CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <form action={handleSignup} className="flex flex-col gap-3">
                        <div className="flex gap-2">
                            <Input autoComplete="no" className="bg-gray-300 dark:bg-gray-900" type="text" placeholder="Enter first name" value={formData.firstName} onChange={(e) => setFormData((formData) => ({...formData, firstName: e.target.value}))} />
                            <Input autoComplete="no" className="bg-gray-300 dark:bg-gray-900" type="text" placeholder="Enter last name" value={formData.lastName} onChange={(e) => setFormData((formData) => ({...formData, lastName: e.target.value}))} />
                        </div>
                        <div className="flex gap-2">
                            <Input autoComplete="no" className="bg-gray-300 dark:bg-gray-900" type="email" placeholder="Enter Email" value={formData.email} onChange={(e) => setFormData((formData) => ({...formData, email: e.target.value}))} />
                            <Input autoComplete="no" className="bg-gray-300 dark:bg-gray-900" type="text" placeholder="Enter Username" value={formData.username} onChange={(e) => setFormData((formData) => ({...formData, username: e.target.value}))} />
                        </div>
                        <div className="flex gap-2">
                            <Input autoComplete="off" name="password" className="bg-gray-300 dark:bg-gray-900" type="password" placeholder="Enter Password" value={formData.password} onChange={(e) => setFormData((formData) => ({...formData, password: e.target.value}))} />
                            <Input autoComplete="new-password" name="confirm-password" className="bg-gray-300 dark:bg-gray-900" type="password" placeholder="Enter Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
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