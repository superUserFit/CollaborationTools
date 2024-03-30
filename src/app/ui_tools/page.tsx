"use client";

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
import { SlashIcon } from "@radix-ui/react-icons";
import MainSideBar from "../ui_components/MainSideBar";
import SecondSideBar from "../ui_components/SecondSideBar";
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useRecoilValue } from 'recoil';
import sidebarAtom from '../atoms/sidebarAtom';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import SideDrawer from '../ui_components/mobile_components/SideDrawer';


const UIToolingPage = () => {
    const minimized = useRecoilValue(sidebarAtom);
    const isMobile = useMediaQuery({ query: '(max-width: 767px)'});

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
                </>
            }
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
                <div className={`${isMobile ? 'flex-col w-full gap-3' : ''} flex my-4 items-center justify-between`}>
                    <div className={`${isMobile ? 'w-full' : ''} flex w-[35%]`}>
                        <Input placeholder='Search your design...' />
                        <Button className='mx-1'>
                            <FaSearch size={20} />
                        </Button>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className={`${isMobile ? 'w-full' : ''} bg-green-400 dark:bg-green-500 hover:bg-green-500 hover:dark:bg-green-700 px-4 text-white`}>Create design</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create your design</DialogTitle>
                            </DialogHeader>
                            <form>
                                <Input placeholder='Design name' className='mt-3' />
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