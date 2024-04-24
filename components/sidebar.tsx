"use client";

import Image from "next/image";
import Link from "next/link";
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

const Sidebar = () => {
    return (
        <div className="space-x-4 flex flex-row w-full bg-[#952323] text-white h-20">
            <div className="flex items-center justify-end w-full px-4 w-full pl-5">
                <div className="flex items-center">
                    {routes.map((route) => (
                        <Link
                        href={route.href}
                        key={route.href}
                        className="text-xl group flex p-3 
                        justify-items-end font-medium cursor-pointer bg-[#C64444] focus-within:text-[#952323]
                        focus-within:bg-white rounded-lg transition ms-4">
                            <div className={cn("flex item-center", thasadith.className)}>
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;