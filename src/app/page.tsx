"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from 'react-responsive';
import { ImMenu } from 'react-icons/im';
import MainSideBar from "./ui_components/MainSideBar";
import SecondSideBar from "./ui_components/SecondSideBar";
import SideDrawer from './ui_components/mobile_components/SideDrawer';


export default function Home() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <main className="flex overflow-x-hidden h-screen">
      <header className="flex">
        {isMobile ? 
        <SideDrawer>
          <section className='w-full flex flex-col h-full p-2'>
            <h1 className='text-center font-semibold'>General Tools</h1>
            <Button>UI Prototyping</Button>
          </section>
        </SideDrawer> : 
          <>
            <MainSideBar/>
            <SecondSideBar/>
          </>}
      </header>
      <section className="w-full flex-col flex-grow">
        <nav className='flex justify-between items-center bg-gray-200 dark:bg-background pb-2 pl-4 rounded-md m-2'>
          <Breadcrumb>
            <BreadcrumbList className='flex items-center mt-2'>
              <BreadcrumbItem>
                <Badge className='cursor-pointer'>
                  <h1>Home</h1>
                </Badge>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
        <div className="flex gap-4">
          <h1>Dashboard</h1>
        </div>
      </section>
    </main>
  );
}
