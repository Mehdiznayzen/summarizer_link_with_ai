'use client'

import { LinksNavbar } from '@/constants';
import logo from '@/public/images/logo-text.svg'
import Image from 'next/image';
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button';
import { ModeToggle } from './DarkMode';
import { GanttChart } from 'lucide-react'
import { motion } from 'framer-motion';


import { Input } from "@/components/ui/input"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const { user } = useUser();
    const router = useRouter()

    return (
        <motion.nav 
            className="navbar fixed shadow-sm flex top-[5px] items-center w-full justify-between h-[60px] z-50 px-6 sm:px-10 lg:px-16 rounded-md"
            initial = {{
                y : -250
            }}
            animate = {{
                y : 0,
                transition : {
                    delay : 0.5,
                    type : 'spring',
                    stiffness : 350
                }
            }}
        >
            <div className='flex items-center gap-[20px] md:gap-[30px]'>

                {/* Mobile navigation */}
                <Sheet>
                    <SheetTrigger asChild>
                        <GanttChart className="block md:hidden cursor-pointer" />
                    </SheetTrigger>
                    <SheetContent side={'left'} className="flex flex-col items-center justify-center gap-[60px]">
                        <SheetHeader className="flex flex-col gap-[10px] items-center justify-center">
                            <SheetTitle>
                                <Image
                                    src={logo}
                                    width={160}
                                    height={160}
                                    alt="Logo"
                                    className='object-contain'
                                />
                            </SheetTitle>
                            <SheetDescription className="text-center">
                                Summarise your URl with platform support by AI.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <ul className='flex items-center flex-col gap-[40px] '>
                                {
                                    LinksNavbar.map((link) => {
                                        const { id, name, url, icon } = link
                                        return (
                                            <li key={id}>
                                                <Link 
                                                    href={url} 
                                                    className='text-sm text-muted-foreground tracking-[1px] flex items-center gap-[10px]'
                                                >
                                                    {icon}
                                                    {name}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <SheetFooter className='flex flex-col gap-[20px] items-center justify-center'>
                            {
                                user ? (
                                    <div className='flex items-center justify-center gap-[20px]'>
                                        <UserButton afterSignOutUrl='/' />
                                        <ModeToggle />
                                    </div>
                                ) : (
                                    <div className='flex items-center justify-center gap-[20px]'>
                                        <Link 
                                            href={''}
                                            onClick={() => user && router.push('/sign-in')}
                                            className='text-sm tracking-[2px] font-semibold'
                                        >
                                            <Button 
                                                variant='outline' 
                                                className="text-muted-foreground"
                                            >
                                                Sign in
                                            </Button>
                                        </Link>
                                        <ModeToggle />
                                    </div>
                                )
                            }
                        </SheetFooter>
                        <div className="flex items-center justify-center">
                            <p className="bottom-[4px] text-[17px] text-center font-semibold tracking-[2px] text-muted-foreground">
                                &copy; Copyright. All rights reserved. <br />
                                Made with <strong>Mehdi Znayzen</strong>
                            </p>
                        </div>
                    </SheetContent>
                </Sheet>
                <Input type="search" placeholder="Search...." className='w-[300px] block md:hidden' />

                {/* Desktop navigation */}
                <Image
                    src={logo}
                    width={160}
                    height={160}
                    alt="Logo"
                    className='object-contain hidden md:block'
                />
                <ul className='md:flex items-center gap-[50px] hidden'>
                    {
                        LinksNavbar.map((link) => {
                            const { id, name, url } = link
                            return (
                                <li key={id}>
                                    <Link 
                                        href={url} 
                                        className='text-sm text-muted-foreground tracking-[1px]'
                                    >
                                        {name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div 
                className='flex items-center gap-[10px]'
            >
                {
                    user ? (
                        <div className='flex items-center gap-[20px]'>
                            <Input type="search" placeholder="Search...." className='w-[100px] xl:w-[100%] lg:block hidden' />
                            <UserButton afterSignOutUrl='/' />
                            <ModeToggle />
                        </div>
                    ) : (
                        <div className='flex items-center gap-[20px]'>
                            <Input type="search" placeholder="Search...." className='w-[100px] xl:w-[100%] lg:block hidden' />
                            <Button variant='outline' className="text-muted-foreground">
                                <Link 
                                    href={'http://localhost:3000/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard'}
                                    className='text-sm tracking-[2px] font-semibold'
                                >
                                    Sign in
                                </Link>
                            </Button>
                            <ModeToggle />
                        </div>
                    )
                }
            </div>
        </motion.nav>
    )
}

export default Navbar