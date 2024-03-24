"use client";

import React from "react";
import { BiTachometer } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { IoChatbubbleEllipses, IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";


const MainSideBar = () => {
    const router = useRouter();

    const logout = () => {
        router.push('/auth/login');
    }

    return (
        <nav className="flex justify-between flex-col px-1 bg-red-500 dark:bg-red-700 h-[100vh]">
            <ul className="mt-4 list-none text-decoration-none">
                <li>
                    <Link href="/">
                        <Button variant="outline" className="rounded-full">
                            <BiTachometer size={20} />
                        </Button>
                    </Link>
                </li>
                {/* <li>
                    <Link href="/">
                        <Button variant="outline" className="rounded-full mt-2">
                            <IoChatbubbleEllipses size={20} />
                        </Button>
                    </Link>
                </li> */}
            </ul>
            <ul className="mt-auto mb-8 list-none text-decoration-none">
                <li>
                    <Link href="/settings">
                        <Button variant="outline" className="rounded-full mb-2">
                            <IoSettingsOutline size={20} />
                        </Button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default MainSideBar;
