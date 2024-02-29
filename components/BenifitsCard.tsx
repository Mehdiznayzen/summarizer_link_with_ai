'use client'

import { cn } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image"
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css';
import { Dancing_Script } from 'next/font/google';


const font = Dancing_Script({ 
    subsets: ["latin"],
    weight : ['400', '500', '600', '700'] 
});

interface BenifitsCardProps {
    benifit: string
    icon: StaticImageData
    title:string
    subTitle: string
}

const BenifitsCard = ({ benifit, icon, subTitle, title } : BenifitsCardProps) => {
    return (
        <VerticalTimelineElement
            visible
            contentStyle={{
                background: 'rgba(255, 255, 255, 0.2)',
                boxShadow: 'inset 10px -50px 94px 0 rgba(199, 199, 199, 0.2)',
                padding: '1rem',
                backdropFilter: '50px',
            }}
            contentArrowStyle={{
                borderRight: '7px solid #E3E1D9',
            }}
            iconStyle={{
                background: 'rgba(255, 255, 255, 0.2)',
                boxShadow: 'inset 10px -50px 94px 0 rgba(199, 199, 199, 0.2)',
                backdropFilter: '50px',
            }}
            icon={
                <div className='flex items-center justify-center w-full h-full'>
                    <Image 
                        src={icon} 
                        alt={`logo_${title}`} 
                        width={35}
                        height={35}
                    />
                </div>
            }
        >
            <Box>
                <h3 className={cn('text-[30px] font-bold', font.className)}>{title}</h3>
                <p className='text-[16px] font-semibold text-muted-foreground'>{subTitle}</p>
            </Box>
            <ul 
                className='mt-5 list-disc ml-5 space-y-2'
            >
                <li 
                    className='text-white-100 text-[14px] pl-1 tracking-wider'
                >
                    {benifit}
                </li>
            </ul>
        </VerticalTimelineElement>
    )
}

export default BenifitsCard