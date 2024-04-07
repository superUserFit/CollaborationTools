"use client";

//  Import react libraries
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FaSearch } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import axios from 'axios';

//  Import UI Components
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList
} from '@/components/ui/breadcrumb';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SlashIcon } from "@radix-ui/react-icons";

//  Import custom components
import MainSideBar from "../ui_components/MainSideBar";
import SecondSideBar from "../ui_components/SecondSideBar";
import SideDrawer from '../ui_components/mobile_components/SideDrawer';
import sidebarAtom from '../atoms/sidebarAtom';
import tokenAtom from '../atoms/tokenAtom';
import { backend } from '../api/api';
import useShowToast from '../hooks/useShowToast';



const UIToolingPage = () => {
    const minimized = useRecoilValue(sidebarAtom);
    const isMobile = useMediaQuery({ query: '(max-width: 767px)'});
    const token = useRecoilValue(tokenAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [room, setRoom] = useState([]);
    const showToast = useShowToast();


    const handleCreateRoom = async (e:any) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${backend}/api/room/create-room`, { roomName }, {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const data = response.data;

            if(data.status === 200) {
                console.log(data.room);
            } else {
                showToast('Error', 'Failed to create a room', 'error');
            }
        } catch(error) {
            showToast('Error', 'Error while creating a room', 'error');
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
                <SecondSideBar minimized={minimized} />
                </>}
            </header>
            <section className="w-full flex-col">
            {isMobile ? <div className='bg-gray-900 w-full h-16 absolute z-40'></div> :
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
                            <Badge className='cursor-pointer'><h1>UI Prototyping</h1></Badge>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Card>}
            <section className={`${isMobile ? 'mt-20 ' : ''} flex flex-col m-4`}>
                <div className='bg-gray-300 dark:bg-gray-800 bg-opacity-25 h-20 rounded-xl flex justify-center items-center backdrop-blur-sm'>Start designing today</div>
                <div className={`${isMobile ? 'flex-col w-full gap-3' : 'flex items-center justify-between'} my-4`}>
                    <div className={`${isMobile ? 'w-full' : ''} flex w-[35%]`}>
                        <Input placeholder='Search your design...' />
                        <Button className={`${isMobile ? 'mx-3' : 'mx-1'}`}>
                            <FaSearch size={20} />
                        </Button>
                    </div>
                    <Dialog>
                        <div className={`${isMobile ? 'flex w-full justify-end my-4' : 'flex justify-end'}`}>
                        <DialogTrigger asChild>
                            <Button className={`${isMobile ? '' : ''} bg-green-400 dark:bg-green-500 hover:bg-green-500 hover:dark:bg-green-700 px-4 text-white`}>Create room</Button>
                        </DialogTrigger>
                        </div>
                        <DialogContent className="w-[80%] rounded-md">
                            <DialogHeader>
                                <DialogTitle>Create your room</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreateRoom}>
                                <Input placeholder='Room name' className='mt-3' value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                                <div className='flex justify-end'>
                                    <Button className='my-3'>Create</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </section>
            </section>
        </main>
    );
}

export default UIToolingPage;