"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList
} from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from 'react-responsive';
import { ImMenu } from 'react-icons/im';
import MainSideBar from "./ui_components/MainSideBar";
import SecondSideBar from "./ui_components/SecondSideBar";
import SideDrawer from './ui_components/mobile_components/SideDrawer';
import Link from 'next/link';


export default function Home() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <main className="flex overflow-x-hidden h-screen">
      <header className="flex">
        {isMobile ? 
        <SideDrawer>
          <section className='w-full flex flex-col h-full p-2 gap-2 bg-gray-200 dark:bg-gray-800'>
            <Link href="/">
              <Button variant="outline" className="rounded-md w-full flex justify-center mt-4 my-2">Home</Button>
            </Link>
            <h1 className='text-center font-semibold mt-4 text-black dark:text-white'>General Tools</h1>
              <Link href='/ui_tools'>
                <Button variant="outline" className="rounded-md w-full flex justify-center mt-2">UI Prototyping</Button>
              </Link>
              <Link href='/settings'>
                <Button variant="outline" className="rounded-md w-full flex justify-center my-2">Settings</Button>
              </Link>
          </section>
        </SideDrawer> : 
          <>
            <MainSideBar/>
            <SecondSideBar/>
          </>}
      </header>
      <section className="w-full flex-col flex-grow">
        {isMobile ? <div className='bg-gray-900 w-full h-16 absolute z-40'></div> : 
        <>
        <Card className='flex justify-between items-center pb-2 pl-4 rounded-md m-2'>
          <Breadcrumb>
            <BreadcrumbList className='flex items-center mt-2'>
              <BreadcrumbItem>
                <Badge className='cursor-pointer'>
                  <h1>Home</h1>
                </Badge>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Card>
        </>}
        <div className="flex gap-4">
          <h1>Dashboard</h1>
        </div>
      </section>
    </main>
  );
}
