'use client'
import { motion } from 'framer-motion'
import Link from 'next/link';

const ScrollHero = () => {
    return (
        <motion.div 
            className="flex items-center justify-center"
            style={{
                position : 'relative',
                top : '220px'
            }}
            initial = {{
                opacity : 0
            }}
            animate = {{
                opacity : 1,
                transition : {
                    duration : 0.6,
                    delay : 0.8
                }
            }}
        >
            <Link href="#about">
                <div className="w-[35px] h-[64px] rounded-3xl border-4 border-[#EEEEEE]  p-2">
                    <motion.div
                        animate={{
                            y : [0, 26, 0],
                        }}
                        transition={{
                            duration : 1.5,
                            repeat : Infinity,
                            repeatType : 'loop'
                        }}
                        className='rounded-full w-3 h-3 bg-muted-foreground'
                    />
                </div>
            </Link>
        </motion.div> 
    )
}

export default ScrollHero