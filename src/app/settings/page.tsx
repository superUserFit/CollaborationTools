"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList
} from '@/components/ui/breadcrumb';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { SlashIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainSideBar from "../ui_components/MainSideBar";
import SecondSideBar from "../ui_components/SecondSideBar";
import { ToggleButton } from '@/components/ToggleButton';
import { backend } from '../api/api';
import useShowToast from '../hooks/useShowToast';
import Cookies from 'js-cookies';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import SideDrawer from '../ui_components/mobile_components/SideDrawer';
import Link from 'next/link';


const SettingsPage = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        username: '',
        role: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useShowToast();
    const setUser = useSetRecoilState(userAtom);
    const router = useRouter();
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    const [roles] = useState([
        {
            key: "Project manager",
            label: "Project manager"
        },
        {
            key: "Developer",
            label: "Developer"
        },
        {
            key: "UI/UX designer",
            label: "UI/UX designer"
        }
    ]);

    const handleRoleChange = (select:string) => {
        setProfile({
            ...profile,
            role: select
        });
    };

    const logout = () => {
        Cookies.removeItem('Infollective');
        setUser(null);
        showToast('Success', 'Successfully logout', 'success');
        router.push('/auth/login');
    }

    const handleUpdateProfile = async () => {
        setIsLoading(true);

        try {
            const response = await axios.patch(`${backend}/api/user/update-profile`, profile, {
                headers: { "Content-Type": "application/json" }
            });

            if(response.status === 200) {
                showToast('Success', 'Profile updated successfully', 'success');
            } else {
                showToast('Failed', 'Profile cannot be updated', 'error');
            }

        }catch(error) {
            showToast('Error', error, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="flex overflow-x-hidden h-[100vh]">
            <header className="flex">
                {isMobile ? 
                <SideDrawer>
                    <section className='w-full flex flex-col h-full p-2 gap-2 bg-gray-200 dark:bg-gray-800'>
                        <Link href="/">
                            <Button variant="outline" className="rounded-md w-full flex justify-center mt-4 my-2">Home</Button>
                        </Link>
                        <h1 className='text-center font-semibold mt-4 text-black dark:text-white'>General Tools</h1>
                        <Link href="/ui_tools">
                            <Button variant="outline" className="rounded-md w-full flex justify-center mt-2">UI Prototyping</Button>
                        </Link>
                        <Link href="/settings">
                            <Button variant="outline" className="rounded-md w-full flex justify-center my-2">Settings</Button>
                        </Link>
                    </section>
                </SideDrawer>: 
                <>
                <MainSideBar/>
                <SecondSideBar/>
                </>}
            </header>
            <section className="w-full flex-col">
                {isMobile ? <div className='bg-gray-900 w-full h-16 absolute z-40'></div> : 
                <>
                <Card className="flex justify-between items-center pb-2 pl-4 m-2 rounded-md">
                    <Breadcrumb>
                        <BreadcrumbList className='flex items-center mt-2'>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/'>
                                    <strong>Home</strong>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <SlashIcon/>
                            <BreadcrumbItem>
                                <Badge className='cursor-pointer'><h1>Settings</h1></Badge>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </Card>
                </>}
                <div className={`${isMobile ? 'flex flex-col mt-20': 'flex flex-row'} flex m-4 mt-4 gap-4`}>
                    <div>
                        <Card className={`mb-2 ${isMobile ? 'w-full' : ''}`}>
                            <CardDescription className='flex justify-center items-center p-2'>
                                <Avatar className='flex justify-center items-center w-40 h-40'>
                                    <AvatarFallback className='text-2xl'>FW</AvatarFallback>
                                </Avatar>
                            </CardDescription>
                        </Card>
                        <Button className='w-full font-semibold text-gray-200 bg-red-500 dark:bg-red-600'>
                            Delete
                        </Button>
                    </div>
                    <Card className='w-full'>
                        <CardHeader className='flex justify-between flex-row'>
                            <strong>Profile</strong>
                            <ToggleButton/>
                        </CardHeader>
                        <CardDescription className='m-4'>
                            <form onSubmit={handleUpdateProfile}>
                                <section className={`${isMobile ? 'flex flex-col gap-8': 'flex flex-row'} flex gap-2 my-4`}>
                                    <div className='flex flex-col w-full'>
                                        <Label className='font-semibold mb-1 ml-2'>First name</Label>
                                        <Input placeholder='Enter first name' autoComplete='no' value={profile.firstName} onChange={(e) => setProfile((profile) => ({...profile, firstName: e.target.value}))}/>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <Label className='font-semibold mb-1 ml-2'>Last name</Label>
                                        <Input placeholder='Enter last name' autoComplete='no' value={profile.lastName} onChange={(e) => setProfile((profile) => ({...profile, lastName: e.target.value}))}/>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <Label className='font-semibold mb-1 ml-2'>Username</Label>
                                        <Input placeholder='Enter username' autoComplete='no' value={profile.username} onChange={(e) => setProfile((profile) => ({...profile, username: e.target.value}))}/>
                                    </div>
                                </section>

                                <section className={`${isMobile ? 'flex flex-col gap-8': 'flex flex-row'} flex gap-2 my-4`}>
                                    <div className='flex flex-col w-full'>
                                        <Label className='font-semibold mb-1 ml-2'>Email</Label>
                                        <Input placeholder='Enter email' autoComplete='no' value={profile.email} onChange={(e) => setProfile((profile) => ({...profile, email: e.target.value}))}/>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <Label className='font-semibold mb-1 ml-2'>Role</Label>
                                        <Select value={profile.role} onValueChange={handleRoleChange}>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue placeholder='Select role'>{profile.role ? profile.role : 'Select role'}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map((role) => (
                                                    <SelectItem key={role.key} value={role.label}>{role.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <Label className='font-semibold mb-1 ml-2'>Password</Label>
                                        <Input placeholder='Enter password' autoComplete='no' value={profile.password} onChange={(e) => setProfile((profile) => ({...profile, password: e.target.value}))}/>
                                    </div>
                                </section>
                            <div className='flex justify-end'>
                                <Button className={`${isMobile ? 'w-full' : ''} flex my-3 font-semibold`} type='submit'>
                                {isLoading ? (<><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Wait</> ) : ("Save Changes")}
                                </Button>
                            </div>
                            </form>
                        </CardDescription>
                    </Card>
                </div>
                <div className='flex justify-end m-4'>
                    <Button type="button" className={`${isMobile ? 'w-[50%]' : ''} font-semibold px-8 bg-red-500 dark:bg-red-600 dark:text-gray-200 hover:bg-red-600 dark:hover:bg-red-700`} onClick={logout}>
                        Logout
                    </Button>
                </div>
            </section>
        </main>
    );
}

export default SettingsPage;