"use client";

import {
    Breadcrumb, BreadcrumbItem,
    BreadcrumbLink, BreadcrumbList
} from '@/components/ui/breadcrumb';
import {
    Select, SelectContent,
    SelectItem, SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    AlertDialog, AlertDialogAction,
    AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog';
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
import { getUser } from '../api/UniversalFunctions';
import useShowToast from '../hooks/useShowToast';
import Cookies from 'js-cookies';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import SideDrawer from '../ui_components/mobile_components/SideDrawer';
import Link from 'next/link';
import tokenAtom from '../atoms/tokenAtom';
import sidebarAtom from '../atoms/sidebarAtom';
import userAtom from '../atoms/userAtom';


const SettingsPage = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        username: '',
        role: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useShowToast();
    const [user, setUser] = useRecoilState(userAtom);
    const [token, setToken] = useRecoilState(tokenAtom);


    const router = useRouter();
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const minimized = useRecoilValue(sidebarAtom);
    const [deleteAction, setDeleteAction] = useState(false);

    const [deleteData, setDeleteData] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
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

    //  Use Effects
    useEffect(() => {
        async () => {
            const user = await getUser(token);
            user ? setUser(user) : null;
        };
    }, [token]);


    useEffect(() => {
        if(deleteData === user.email) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }

    }, [deleteData]);

    const handleRoleChange = (select:string) => {
        setProfile({
            ...profile,
            role: select
        });
    };

    const handleLogout = () => {
        Cookies.removeItem('Infollective');
        setToken(null);
        showToast('Success', 'Successfully logout', 'success');
        router.push('/auth/login');
    }

    const handleUpdateProfile = async (e:any) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.patch(`${backend}/api/user/update-profile`, profile, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const data = response.data;

            if(response.status === 200) {
                showToast('Success', data.message, 'success');
            } else {
                showToast('Failed', data.message, 'error');
            }

        }catch(error) {
            showToast('Error', 'Error while updating profile', 'error');
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteAccount = async (e:any) => {
        e.preventDefault();

        const response = await axios.delete(`${backend}/api/user/delete-user`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        const data = response.data;

        if(data.status !== 200) {
            showToast('Error', data.message, 'error');
        }

        showToast('Success', data.message, 'success');
        setToken('');
        Cookies.removeItem('Infollective');
        setIsDisabled(false);
        router.push('/auth/login');
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
                <SecondSideBar minimized={minimized} />
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
                <div className={`${isMobile ? 'flex flex-col mt-24': 'flex flex-row'} flex m-4 mt-4 gap-4`}>
                    <div>
                        <Card className={`${isMobile ? 'w-full mt-16' : ''} mb-2`}>
                            <CardDescription className='flex justify-center items-center p-2'>
                                <Avatar className='flex justify-center items-center w-40 h-40'>
                                    <AvatarFallback className='text-2xl'>FW</AvatarFallback>
                                </Avatar>
                            </CardDescription>
                        </Card>
                        <AlertDialog>
                            <AlertDialogTrigger className='w-full'>
                                <Button className='w-full text-gray-200 bg-red-500 dark:bg-red-600'>
                                    Delete Account
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className={`${isMobile? 'text-center': ''} w-[80%] rounded-md`}>
                                <AlertDialogHeader>Are you should that you want to delete this account?</AlertDialogHeader>
                                <AlertDialogDescription className='flex justify-center flex-col items-center'>
                                    <p>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
                                    <div className='flex flex-col mt-8 gap-2 w-[60%]'>
                                        {!deleteAction ? <Button className='w-full bg-red-500 dark:bg-red-600 text-white' onClick={() => setDeleteAction(true)}>I understand this action</Button> : ''}
                                        {!deleteAction ? '':
                                        <form onSubmit={handleDeleteAccount} className='text-center'>
                                            <p className='text-center'>Please enter the email that is used by this account:</p>
                                            <strong className='text-center'>{user.email}</strong>
                                            <Input className='w-full' autoComplete='no' value={deleteData} onChange={(e) => setDeleteData(e.target.value)} />
                                            <Button className='w-full mt-2 bg-red-500 text-white hover:bg-red-700' disabled={isDisabled}>Delete account</Button>
                                        </form>}
                                        <AlertDialogCancel className='w-full bg-green-500 dark:bg-green-600 text-white' onClick={() => setDeleteAction(false)}>Cancel</AlertDialogCancel>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogContent>
                        </AlertDialog>
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
                                        <Input
                                            placeholder={user.firstName ? user.firstName : 'Enter first name'}
                                            autoComplete='no'
                                            value={profile.firstName}
                                            onChange={(e) => setProfile((profile) => ({...profile, firstName: e.target.value}))}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <Label className='font-semibold mb-1 ml-2'>Last name</Label>
                                        <Input
                                            placeholder={user.lastName ? user.lastName : 'Enter last name' }
                                            autoComplete='no'
                                            value={profile.lastName}
                                            onChange={(e) => setProfile((profile) => ({...profile, lastName: e.target.value}))}
                                        />
                                    </div>
                                </section>

                                <section className={`${isMobile ? 'flex flex-col gap-8': 'flex flex-row'} flex gap-2 my-4`}>
                                    <div className='flex flex-col w-full'>
                                        <Label className='font-semibold mb-1 ml-2'>Username</Label>
                                        <Input
                                            placeholder={user.username ? user.username : 'Enter username'}
                                            autoComplete='no'
                                            value={profile.username}
                                            onChange={(e) => setProfile((profile) => ({...profile, username: e.target.value}))}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <Label className='font-semibold mb-1 ml-2'>Role</Label>
                                        <Select value={profile.role} onValueChange={handleRoleChange}>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue placeholder={user.role ? user.role : 'Select role'}>{profile.role ? profile.role : 'Select role'}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map((role) => (
                                                    <SelectItem key={role.key} value={role.label}>{role.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="button" className={`${isMobile ? 'w-[50%]' : ''} font-semibold px-8 bg-red-500 dark:bg-red-600 dark:text-gray-200 hover:bg-red-600 dark:hover:bg-red-700`}>
                                Logout
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='w-[80%]'>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className='bg-green-500 dark:bg-green-600 text-white'>Cancel</AlertDialogCancel>
                                <AlertDialogAction className='bg-red-500 dark:bg-red-600 text-white' onClick={handleLogout}>Logout</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </section>
        </main>
    );
}

export default SettingsPage;