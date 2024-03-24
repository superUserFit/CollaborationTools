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
import { Badge } from '@/components/ui/badge';
import { SlashIcon } from "@radix-ui/react-icons";
import MainSideBar from "../ui_components/MainSideBar";
import SecondSideBar from "../ui_components/SecondSideBar";
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';
import { Button } from '@/components/ui/button';


const UIToolingPage = () => {
    return (
        <main className="flex overflow-x-hidden">
            <header className="flex">
                <MainSideBar/>
                <SecondSideBar/>
            </header>
            <section className="w-full flex-col">
            <nav className="flex justify-between items-center bg-gray-300 dark:bg-gray-800 pb-2 pl-2">
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
            </nav>
            <section className='flex flex-col m-4'>
                <div className='bg-gray-300 dark:bg-gray-800 bg-opacity-25 h-20 rounded-xl flex justify-center items-center backdrop-blur-sm'>Start designing today</div>
                <div className='flex my-4 items-center justify-between'>
                    <div className='flex w-[35%]'>
                        <Input placeholder='Search your design...' />
                        <Button className='mx-1'>
                            <FaSearch size={20} />
                        </Button>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className='bg-green-400 dark:bg-green-600 hover:bg-green-500 hover:dark:bg-green-700 px-4 font-semibold text-gray-700 dark:text-gray-300'>Create design</Button>
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