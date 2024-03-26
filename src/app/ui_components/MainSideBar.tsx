"use client";

import React from "react";
import { BiTachometer } from "react-icons/bi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoChatbubbleEllipses, IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import sidebarAtom from "../atoms/sidebarAtom";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import userAtom from "../atoms/userAtom";


const MainSideBar = () => {
    const router = useRouter();
    const user = useRecoilValue(userAtom);
    const minimized = useRecoilValue(sidebarAtom);

    // useEffect(() => {
    //     if(!user) {
    //         router.push('/auth/login');
    //     }
    // }, []);

    return (
        <Card className="flex justify-between flex-col px-1 outline-8 bg-gray-300 dark:bg-background m-2 rounded-md">
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
        </Card>
    );
}

export default MainSideBar;
