'use client';

import { useEffect, useState } from "react"
import { Box } from '@chakra-ui/react';

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0)

    const handleProgress = () => {
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        let scrollTop = document.documentElement.scrollTop

        const progress = (scrollTop / height) * 100
        setScrollProgress(progress)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleProgress)
    }, [])

    return (
        <Box
            className={`fixed top-0 left-0 h-[4px] rounded-xl bg-muted-foreground z-50`}
            style = {{
                width : `${scrollProgress}%`,
            }}
        >
        </Box>
    )
}

export default ScrollProgress