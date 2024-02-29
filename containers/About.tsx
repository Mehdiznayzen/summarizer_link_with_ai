'use client'

import TestimonialCard from '@/components/TestimonialCard';
import { TestimonialInfo } from '@/constants';
import { Box, Heading } from '@chakra-ui/react';
import animation from '@/public/images/animation_about_page.json'
import Lottie from 'react-lottie'
import { cn } from '@/lib/utils';
import { Dancing_Script } from 'next/font/google';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';

const font = Dancing_Script({ 
    subsets: ["latin"],
    weight : ['400', '500', '600', '700'] 
});

const About = () => {
    return (
        <section 
            id="about" 
            className="min-h-screen flex flex-col gap-[10px] about_page px-6 sm:px-10 lg:px-16"
        >

            <Box className="flex flex-col items-center justify-center gap-[20px] w-[100%]">
                <div className="flex flex-col gap-[10px]">
                    <motion.h1
                        style={{ 
                            fontSize:'50px',
                            letterSpacing:'2px',
                            color:'#864AF9' 
                        }}
                        variants={fadeIn("left", "spring", 0.4, 0.6)}
                        initial="hidden"
                        whileInView='show'
                        className={cn(`text-center text-black font-bold text-[40px] tracking-[2px]"`, font.className)}
                    >
                        ChatGPT Summarizer
                    </motion.h1>
                    <motion.p 
                        variants={fadeIn("right", "spring", 0.5, 0.7)}
                        initial="hidden"
                        whileInView='show'
                        className="text-center text-muted-foreground text-[16px]"
                    >
                        Welcome to ChatGPT Summarizer, an innovative service that makes life easier by generating instant summaries for websites. <br />
                        Simply provide a page URL, and our intelligent API will create a concise and informative summary. Whether you need <br />
                        to summarize articles, blogs, or reports, ChatGPT Summarizer lets you quickly get the gist without having to read <br />
                        the entire content. Save time and quickly access key information with our text summarization tool powered by the 
                        power of AI. To try is to adopt it!
                    </motion.p>
                </div>
                <motion.div 
                    className="animation_about"
                    variants={fadeIn("down", "spring", 0.5, 0.7)}
                    initial="hidden"
                    whileInView='show'
                >
                    <Lottie 
                        options={{
                            loop: true,
                            autoplay: true, 
                            animationData: animation
                        }}
                        style={{
                            width : '420px'
                        }}
                    />
                </motion.div>
            </Box>
            <Box 
                className='flex flex-row justify-center lg:justify-between gap-[50px] w-full'>
                {
                    TestimonialInfo.map((item) => {
                        const { id, image, message, name } = item

                        return (
                            <TestimonialCard
                                key={id}
                                id={id}
                                image={image}
                                message={message}
                                name={name}
                            />
                        )
                    })
                }
            </Box>
            
            {/* Gradient animation */}
            <div className='gradient-about' />
        </section>
    )
}

export default About