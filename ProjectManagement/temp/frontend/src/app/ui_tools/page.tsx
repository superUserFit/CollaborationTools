"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { SlashIcon } from "@radix-ui/react-icons";
import MainSideBar from "../ui_components/MainSideBar";
import SecondSideBar from "../ui_components/SecondSideBar";

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
            <section>
                <div className='bg-gray-300 dark:bg-gray-800 bg-opacity-25 m-4 h-20 rounded-xl flex justify-center items-center backdrop-blur-sm'>Start designing today</div>
            </section>
            </section>
        </main>
    );
}

export default UIToolingPage;