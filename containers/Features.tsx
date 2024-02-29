'use client'

import BenifitsCard from "@/components/BenifitsCard"
import { benifts } from "@/constants"
import { Box, Heading } from "@chakra-ui/react"
import React from "react"
import { VerticalTimeline } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css';
import { Dancing_Script } from 'next/font/google';
import { cn } from "@/lib/utils"
import { ContactCard } from "@/components/ContactCard"
import Lottie from "react-lottie"
import animation from '@/public/images/contact_animation.json'
import { motion } from 'framer-motion';
import { fadeIn } from "@/utils/motion"

const font = Dancing_Script({ 
    subsets: ["latin"],
    weight : ['400', '500', '600', '700'] 
});


const Features = () => {
    return (
        <section 
            id="features" 
            className="min-h-screen px-6 sm:px-10 lg:px-16 flex flex-col gap-[50px]"
            style={{
                position: 'relative',
                top : '100px'
            }}
        >
            <motion.div 
                className="flex flex-col text-start lg:text-start"
                variants={fadeIn("left", "spring", 0.5, 0.7)}
                initial="hidden"
                whileInView='show'
            >
                <Heading 
                    fontSize={'24px'}
                    className={cn("text-muted-foreground font-bold")}
                >
                    What is The Benifits Of <br />
                    <span 
                        style={{ fontSize : '57px', letterSpacing : '2px', color : '#7F27FF'}} 
                        className={font.className}
                    >
                        AI Summarizer
                    </span>
                </Heading>
                <p className="text-muted-foreground">
                    An AI summarizer that can summarize URLs typically refers to a tool or service that uses artificial <br /> 
                    intelligence (AI) and natural language processing (NLP) techniques to generate concise and coherent <br />
                    summaries of the content found at specific URLs (web pages).Here's some benefits of that :
                </p>
            </motion.div>
            <Box className="">
                <VerticalTimeline lineColor="" animate={true}>
                    {
                        benifts.map((item) => {
                            const { benifit, icon, id, subTitle, title } = item
                            return (
                                <React.Fragment
                                    key={id}
                                >
                                    <BenifitsCard
                                        benifit = {benifit}
                                        icon={icon}
                                        title={title}
                                        subTitle={subTitle}
                                    />
                                </React.Fragment>
                            )
                        })
                    }
                </VerticalTimeline>
            </Box>

            {/* Animation gradient */}
            <div className="gradient-features" />

            {/* Contact */}
            <motion.div 
                className="flex items-center justify-center w-full"
                variants={fadeIn("left", "spring", 0.4, 0.6)}
                initial="hidden"
                whileInView='show'
            >
                <div 
                    className="rounded-xl border border-dashed border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] contact_card p-4 flex items-center justify-between" 
                    style={{ width: '1000px', height : '300px' }}
                >
                    <Box className="flex flex-col items-center justify-center lg:justify-start gap-[30px] m-10 w-[100%] lg:w-[500px]">
                        <div className="info flex flex-col items-center justify-center lg:justify-start gap-[5px] md:gap-[10px] w-full">
                            <Heading fontSize="20px" letterSpacing="2px" className='font-semibold text-center lg:text-start'>
                                Start now, <br />
                                <span className={cn('', font.className)} style={{ color : '#864AF9', letterSpacing:'2px', fontSize:'44px'}}>No strings attached</span> 
                            </Heading>
                            <h1 className="text-muted-foreground text-center">
                                A user-friendly contact form is provided, allowing you to input your name, email address, and a message. 
                            </h1>
                        </div>
                        <Box style={{ marginTop : '30px' }}>
                            <ContactCard />
                        </Box>
                    </Box>

                    <Box className="hidden lg:block">
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
                    </Box>
                </div>
            </motion.div>
        </section>
    )
}

export default Features