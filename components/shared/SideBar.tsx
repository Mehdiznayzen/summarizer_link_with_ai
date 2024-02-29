"use client"

import { navLinks } from '@/constants'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logo from '@/public/images/logo-text.svg'
import { Separator } from "@/components/ui/separator"
import { Box } from '@chakra-ui/react'
import { cn } from '@/lib/utils'
import { Dancing_Script } from 'next/font/google';

const font = Dancing_Script({ 
    subsets: ["latin"],
    weight : ['400', '500', '600', '700'] 
});

const Sidebar = () => {
    const pathname = usePathname();
    const { user } = useUser()

    return (
        <aside className="hidden h-screen w-72 bg-[#F6F5F5] p-5 shadow-md shadow-purple-300/50 lg:flex">
            <div 
                className="flex size-full flex-col gap-4"
            >
                <Link 
                    href="/" 
                    className="flex items-center justify-center gap-2 md:py-2"
                >
                    <Image 
                        src={logo}
                        alt="logo" 
                        width={180} 
                        height={28} 
                    />
                </Link>

                <nav className="h-full flex-col justify-between md:flex md:gap-4">
                    <ul className="hidden w-full flex-col items-center justify-center gap-2 md:flex">
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

                    <Separator className="my-4" />

                    <div className="flex flex-col items-center justify-center gap-[28px]">
                        <Box className="flex items-center justify-center cursor-pointer gap-[20px] p-4">
                            <div className="">
                                <UserButton 
                                    afterSignOutUrl='/' 
                                />
                            </div>
                            <div className="">
                                <h1 className={cn('text-[#7F27FF]', font.className)} style={{ fontSize:'26px' }}>{user?.username}</h1>
                                <p className='text-muted-foreground font-semibold text-[15px]'>{user?.emailAddresses?.[0]?.emailAddress}</p>
                            </div>
                        </Box>
                        <Box className="flex items-center justify-center">
                            <p 
                                className="bottom-[4px] text-[14px] text-center font-semibold tracking-[2px] text-muted-foreground"
                            >
                                &copy; Copyright. All rights reserved. <br />
                                Made with <strong>Mehdi Znayzen</strong>
                            </p>
                        </Box>
                    </div>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar