'use client';

import imageHero1 from '@/public/images/circuit-lines@2xl.ee1ad3dd.webp';
import imageHero2 from '@/public/images/circuit-components@2xl.288e1b6c.webp'
import Image from 'next/image';
import { Box } from '@chakra-ui/react';
import { Dancing_Script } from 'next/font/google';
import ScrollButton from '@/components/ScrollButton';
import ScrollHero from '@/components/ScrollHero'
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import logo from '@/public/images/logo-text.svg'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';


const font = Dancing_Script({ 
    subsets: ["latin"],
    weight : ['400', '500', '600', '700'] 
});

const Home = () => {
    const router = useRouter()
    const { user } = useUser()

    return (
        <section 
            id="#" 
            className="min-h-screen mt-[100px] px-6 sm:px-10 lg:px-16"
        >

            <div className='gradient'/>

            <Box className="images_container">
                <Image 
                    src={imageHero1}
                    fill
                    alt='hero_image'
                    className='absolute w-full h-full top-[10px] z-0'
                />
                <Image 
                    src={imageHero2}
                    fill
                    alt='hero_image'
                    className='absolute w-full h-full top-[10px] z-0'
                />
            </Box>
            <Box 
                className="flex flex-col text-center gap-[40px] items-center justify-center"
                style={{
                    position : 'relative',
                    top : '130px'
                }}
            >
                <motion.h1 
                    style={{ fontSize:"65px", letterSpacing:"2px"}}
                    className={cn(`font-semibold`, font.className)}
                    variants={fadeIn("right", "spring", 0.3, 0.5)}
                    initial="hidden"
                    whileInView='show'
                >
                    Introducing the future of <span>AI</span> With <br className="hidden lg:block"/>
                    Article <span className="">Extractor and Summarizer</span>
                </motion.h1>
                <motion.p 
                    style={{ fontSize:"20px", letterSpacing:"1px" }}
                    className="text-muted-foreground"
                    variants={fadeIn("left", "spring", 0.4, 0.6)}
                    initial="hidden"
                    whileInView='show'
                >
                    Simplify your reading with Summize, an open-source article summarizer that transforms <br />
                    lengthy articles into clear and concise summaries
                </motion.p>
                <motion.div
                    variants={fadeIn("left", "spring", 0.4, 0.6)}
                    initial="hidden"
                    whileInView='show'
                >
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button 
                                className='w-[300px] relative' variant='outline'
                                onClick={() => user && router.push('/dashboard')}
                            >
                                Get Started
                            </Button>
                        </DialogTrigger>
                        {
                            !user && (
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="flex flex-col items-center justify-center gap-[10px]">
                                            <Image
                                                src={logo}
                                                width={160}
                                                height={160}
                                                alt="Logo"
                                                className='object-contain'
                                            />
                                        </DialogTitle>
                                    </DialogHeader>
                                    <h1 
                                        className={cn("text-center", font.className)} 
                                        style={{ fontSize:'23px'}} 
                                    >
                                        You need to be logged  in to use our service!
                                    </h1>
                                </DialogContent>
                            )
                        }
                    </Dialog>
                </motion.div>
            </Box>

            {/* Scroll Button */}
            <ScrollButton />   

            {/* Scroll animation */}
            <ScrollHero />
        </section>
    )
}

export default Home;
