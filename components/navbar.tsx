"use client";

import React from 'react'
import { useState } from 'react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Thasadith } from "next/font/google";

import { cn } from "@/lib/utils";

const thasadith = Thasadith({
    weight: "700", 
    subsets:["latin"]
})

const routes = [
    {
        label: "คำถามทั่วไป",
        href: "/general",
    },
    {
        label: "การลงทะเบียนเรียน",
        href: "/regis",
    },
    {
        label: "การแนะนำหลักสูตร",
        href: "/intro",
    },
    {
        label: "แนะนำอาชีพ",
        href: "/resume",
    }
]

export const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="flex items-center justify-end p-4">
            <div className="md:hidden">
                <Button variant="ghost" size="icon" className="w-10 h-8 flex flex-col justify-center items-center z-50 relative" onClick={toggleMenu}>
                    <Menu />
                </Button>
                {showMenu && (
                    <div className="absolute top-0 left-0 w-screen h-screen bg-[#952323] text-white flex flex-col justify-center items-center gap-8 text-4xl z-40">
                        <div className="md:flex md:items-center md:space-x-4 m-auto">
                            {routes.map((route) => (
                                <Link href={route.href} key={route.href}
                                className="text-xl group flex p-3 
                                justify-items-end font-medium cursor-pointer ms-4">
                                    <div className="relative">
                                        <div className={cn("relative z-10 flex items-center justify-items-left w-48 h-12 text-xl text-white transition", thasadith.className)}>
                                            {route.label}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
