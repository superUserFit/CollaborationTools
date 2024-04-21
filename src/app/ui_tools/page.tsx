"use client";

//  Import react libraries
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FaSearch } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';
import axios from '@/app/api/api';

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
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SlashIcon } from "@radix-ui/react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";

//  Import custom components
import MainSideBar from "../ui_components/MainSideBar";
import SecondSideBar from "../ui_components/SecondSideBar";
import SideDrawer from '../ui_components/mobile_components/SideDrawer';
import DeleteDialog from './DeleteDialog';
import sidebarAtom from '../atoms/sidebarAtom';
import tokenAtom from '../atoms/tokenAtom';
import useShowToast from '../hooks/useShowToast';
import userAtom from '../atoms/userAtom';
import Loading from '../ui_components/Loading';



const UIToolingPage = () => {
    const minimized = useRecoilValue(sidebarAtom);
    const isMobile = useMediaQuery({ query: '(max-width: 767px)'});
    const token = useRecoilValue(tokenAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([]);
    const showToast = useShowToast();
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        const getAllRooms = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/room/get-index-room', {
                    headers: { Authorization: `Bearer ${token}`}
                });

                if(!response.data) {
                    return;
                }

                const data = response.data;
                setRooms(data.rooms);
            } catch(error) {
                showToast('Error', error.response.data.message, 'error');
            } finally {
                setIsLoading(false);
            }
        }
        getAllRooms();
    }, [])

    const handleCreateRoom = async (e:any) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/room/create-room', { roomName }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(!response.data) {
                return;
            }

            const data = response.data;
            setRooms(data.room);
        } catch(error) {
            showToast('Error', error.response.data.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <main className="flex overflow-x-hidden h-[100vh]">
            <header className="flex my-2 gap-1 ml-1">
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
            <section className={`${isMobile ? 'mt-20 ' : ''} flex flex-col my-2 mx-2`}>
                <div className='bg-gray-300 dark:bg-gray-800 bg-opacity-25 h-20 rounded-xl flex justify-center items-center backdrop-blur-sm'>Start designing today</div>
                <div className={`${isMobile ? 'flex-col w-full gap-3' : 'flex items-center justify-between'} my-2`}>
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

            {isLoading && ( <Loading /> )}

            <div className={`${isMobile ? 'flex flex-col' : ''} px-4`}>
            {rooms && rooms.data && rooms.data.map((room) =>
                    <Card key={room.id} className={`${isMobile ? 'w-full' : 'w-[40%]'} h-28 flex justify-center flex-col relative cursor-pointer`}>
                    <CardContent className='flex justify-center'>
                        <p>{room.id}</p>
                    </CardContent>
                    <div className="absolute top-0 right-0 mr-2 mt-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={'ghost'}>
                                    <BsThreeDotsVertical size={20} />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-60'>
                                <div className='flex flex-col w-full px-1 gap-2'>
                                    <Button>Manage members</Button>
                                    <DeleteDialog user={user}>
                                        <Button className='w-full text-gray-200 bg-red-500 dark:bg-red-600'>Delete</Button>
                                    </DeleteDialog>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </Card>
            )}

            </div>
            </section>
        </main>
    );
}

export default UIToolingPage;