"use client";

//  Import react libraries
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import Link from "next/link";

//  Import UI Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaProjectDiagram, FaTasks } from "react-icons/fa";
import { BiPaint } from "react-icons/bi";
import { PiShareNetworkDuotone } from "react-icons/pi";
import { ImMenu } from "react-icons/im";
import { MdGroups } from "react-icons/md";

//  Import custom components
import sidebarAtom from "../atoms/sidebarAtom";

const SecondSideBar = ({ minimized }: { minimized:boolean }) => {
    const setMinimized = useSetRecoilState(sidebarAtom);

    const toggleSidebar = () => {
        setMinimized(!minimized);
    };

    return (
        <Card className={`flex justify-between transition-all duration-500 flex-col rounded-md m-2 px-2 ${minimized ? 'w-20' : 'w-[20vw]'}`}>
            <ul className="flex flex-col gap-1 mt-2 list-none text-decoration-none">
                <div className="mb-2 flex justify-between">
                    {!minimized && <strong className="flex justify-center items-end">General Tools</strong>}
                    <Button className="bg-transparent dark:bg-transparent text-black dark:text-white hover:bg-gray-400 hover:dark:bg-gray-800" onClick={toggleSidebar}>
                        <ImMenu size={24} />
                    </Button>
                </div>
                {/* <li>
                    <Link href="/projects">
                        <Button variant="outline" className="rounded-md w-full flex justify-start gap-3">
                            <FaProjectDiagram size={24} />
                            {!minimized && <p>Projects</p>}
                        </Button>
                    </Link>
                </li> */}
                <li>
                    <Link href="/ui_tools">
                        <Button variant="outline" className="rounded-md w-full flex justify-start gap-3">
                            <BiPaint size={24} />
                            {!minimized && <p>UI Prototyping</p>}
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link href="/api_documentation">
                        <Button variant="outline" className="rounded-md w-full flex justify-start gap-3">
                            <PiShareNetworkDuotone size={24} />
                            {!minimized && <p>API Documentation</p>}
                        </Button>
                    </Link>
                </li>
            </ul>
        </Card>
    );
}

export default SecondSideBar;
