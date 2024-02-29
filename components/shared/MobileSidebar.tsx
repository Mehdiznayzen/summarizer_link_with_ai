"use client"

import { Sheet, SheetContent, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import logo from '@/public/images/logo-text.svg'
import { Box } from "@chakra-ui/react"
import { Separator } from "../ui/separator"
import { GanttChart } from 'lucide-react'


const MobileNav = () => {
    const pathname = usePathname();

    return (
        <header className="flex items-center justify-between fixed h-16 w-full border-purple-100 bg-[#F6F5F5] shadow-md p-5 lg:hidden z-50" style={{ backdropFilter : 'blur(40px)'}}>
            <Link href="/" className="flex items-center gap-2 md:py-2">
                <Image
                    src={logo}
                    alt="logo"
                    width={180}
                    height={28}
                />
            </Link>

            <nav className="flex gap-2">
                <UserButton afterSignOutUrl="/" />

                <Sheet>
                    <SheetTrigger>
                        <GanttChart className="block cursor-pointer" />
                    </SheetTrigger>
                    <SheetContent className="flex flex-col items-center justify-center gap-[20px] sm:w-64">
                        <>
                            <Image 
                                src={logo}
                                alt="logo"
                                width={152}
                                height={23}
                            />
                            
                            <SheetDescription className="text-center">
                                Summarise your URl with platform support by AI.
                            </SheetDescription>
                            
                            <Separator />

                            <ul className="mt-8 flex w-full flex-col items-center gap-5">
                                {
                                    navLinks.map((link) => {
                                        const isActive = link.route === pathname

                                        return (
                                            <li 
                                                key={link.route} 
                                                className={`flex-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover transition-all hover:bg-purple-100 hover:shadow-inner group ${
                                                isActive ? 'bg-[#7F27FF] text-white' : 'text-gray-700'}`}
                                            >
                                                <Link className="p-16-semibold flex text-center size-full gap-4 p-4" href={link.route}>
                                                    <Image 
                                                        src={link.icon}
                                                        alt="logo"
                                                        width={24}
                                                        height={24}
                                                        className={`${isActive && 'brightness-200'}`}
                                                    />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>

                            <Separator />
                            
                            <Box className="flex items-center justify-center">
                                <p 
                                    className="bottom-[4px] text-[17px] text-center font-semibold tracking-[2px] text-muted-foreground"
                                >
                                    &copy; Copyright. All rights reserved. <br />
                                    Made with <strong>Mehdi Znayzen</strong>
                                </p>
                            </Box>
                        </>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    )
}

export default MobileNav