"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaProjectDiagram, FaTasks } from "react-icons/fa";
import { BiPaint } from "react-icons/bi";
import { ImMenu } from "react-icons/im";
import { MdGroups } from "react-icons/md";

const SecondSideBar = () => {
    const [minimized, setMinimized] = useState(false);

    const toggleSidebar = () => {
        setMinimized(!minimized);
    };

    return (
        <nav className={`flex justify-between transition-all duration-500 flex-col px-2 h-[100vh] bg-gray-300 dark:bg-gray-800 ${minimized ? 'w-20' : 'w-[20vw]'}`}>
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
            </ul>
        </nav>
    );
}

export default SecondSideBar;
