'use client'
import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';

interface TestimonialCardProps {
    image : string,
    message : string,
    name : string,
    id : number
}

const TestimonialCard = ({ image, message, name, id } : TestimonialCardProps) => {
    return (
        <Tilt>
            <motion.div
                className="rounded-xl border cursor-pointer border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] testimonial_card p-4 z-50"
                variants={fadeIn("right", "spring", id * 0.5, 0.75)}
                initial="hidden"
                whileInView='show'
            >
                <p className='text-muted-foreground font-black text-[48px]'>"</p>
                <div className="mt-1">
                    <p
                        className="tracking-[1px] text-muted-foreground"
                    >
                        {message}
                    </p>

                    <Box className='mt-7 flex justify-around items-center gap-1'>
                        <div className='flex-1 flex flex-col'>
                            <p className='font-medium text-[16px] text-muted-foreground"'>
                                <span className='blue-text-gradient text-[#596FB7] mr-2'>@</span> 
                                {name}
                            </p>
                        </div>
                        <Image
                            src={image}
                            alt={`feedback_by-${name}`}
                            className='w-10 h-10 rounded-full object-cover'
                            width={32}
                            height={32}
                        />
                    </Box>
                </div>
            </motion.div>
        </Tilt>
    )
}

export default TestimonialCard