"use client";

//  Import react libraries
import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";

//  Import UI Components
import { BiTachometer } from "react-icons/bi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoChatbubbleEllipses, IoSettingsOutline } from "react-icons/io5";

//  Import custom components
import { getUser } from "../api/UniversalFunctions";
import tokenAtom from "../atoms/tokenAtom";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";


const MainSideBar = () => {
    const token = useRecoilValue(tokenAtom);
    const setUser = useSetRecoilState(userAtom);
    //const showToast = useShowToast();

    useEffect(() => {
        if(!token) {
            redirect('/auth/login');
        }

        async () => {
            const user = await getUser(token);
            user ? setUser(user) : null;
        }
    }, [setUser]);

    return (
        <Card className="flex justify-between flex-col px-1 outline-8 m-2 rounded-md">
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
