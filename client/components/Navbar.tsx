'use client'

import { LinksNavbar } from '@/constants';
import logo from '@/public/icons/logo-text.svg'
import Image from 'next/image';
import Link from 'next/link';
import { UserButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from './ui/button';
import { ModeToggle } from './DarkMode';
import { GanttChart } from 'lucide-react'
import { motion } from 'framer-motion';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {
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
                    <SheetContent 
                        side={'left'} 
                        className="flex flex-col items-center justify-center gap-[60px]"
                    >
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
                            <SignedIn>
                                <div className='flex items-center gap-[20px]'>
                                    <UserButton afterSignOutUrl='/' />
                                    <ModeToggle />
                                </div>
                            </SignedIn>
                            <SignedOut>
                                <div className='flex items-center gap-[20px]'>
                                    <SignUpButton
                                        mode='modal'
                                        afterSignInUrl={'/onboarding'}
                                        afterSignUpUrl={'/onboarding'}
                                    >   
                                        <Button variant={'outline'}>
                                            Sign Up
                                        </Button>
                                    </SignUpButton>
                                    <ModeToggle />
                                </div>
                            </SignedOut>
                        </SheetFooter>
                        <div className="flex items-center justify-center">
                            <p className="bottom-[4px] text-[17px] text-center font-semibold tracking-[2px] text-muted-foreground">
                                &copy; Copyright. All rights reserved. <br />
                                Made with <strong>Mehdi Znayzen</strong>
                            </p>
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Desktop navigation */}
                <Image
                    src={logo}
                    width={160}
                    height={160}
                    alt="Logo"
                    className='object-contain hidden md:block'
                />
                <ul className='md:flex items-center gap-[50px] hidden ml-[20px]'>
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
                <SignedIn>
                    <div className='flex items-center gap-[20px]'>
                        <UserButton afterSignOutUrl='/' />
                        <ModeToggle />
                    </div>
                </SignedIn>
                <SignedOut>
                    <div className='flex items-center gap-[20px]'>
                        <SignUpButton
                            mode='modal'
                            afterSignInUrl={'/onboarding'}
                            afterSignUpUrl={'/onboarding'}
                        >   
                            <Button variant={'outline'}>
                                Sign Up
                            </Button>
                        </SignUpButton>
                        <ModeToggle />
                    </div>
                </SignedOut>
            </div>
        </motion.nav>
    )
}

export default Navbar