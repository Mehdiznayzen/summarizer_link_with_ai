'use client'

import { Dancing_Script } from 'next/font/google'
import animation from '@/public/images/dashboard_animation.json'
import Lottie from 'react-lottie'
import { useEffect, useState } from 'react';
import { SentencesToGenerate } from '@/constants';
import { FormSummarizer } from './../../../../components/shared/FormSummarizer';
import { cn } from '@/lib/utils';
import copyIcon from '@/public/images/copy.svg'
import tickIcon from '@/public/images/tick.svg'
import loader from '@/public/images/loader.svg'
import Image from 'next/image';




const font = Dancing_Script({ 
    subsets: ["latin"],
    weight : ['400', '500', '600', '700'] 
});

const Dashboard = () => {
    const [sentence, setSentence] = useState<string>('')
    const [copy, setCopied] = useState<boolean>(false)
    const [summaryText, setSummaryText] = useState<string>('')
    const [isFetching, setIsFetching] = useState<boolean>()
    const [error, setError] = useState<{ data?: { error: string } } | null>(null);
    
    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * SentencesToGenerate.length)
        const randomSentence = SentencesToGenerate[randomNumber]
        setSentence(randomSentence.sentence)
        setInterval(() => {
            const randomNumber = Math.floor(Math.random() * SentencesToGenerate.length)
            const randomSentence = SentencesToGenerate[randomNumber]
            setSentence(randomSentence.sentence)
        }, 4000)
    }, [])

    // function for handle copy the text summary
    const handleCopy = (copyText : any) => {
        setCopied(true)
        navigator.clipboard.writeText(copyText)

        setTimeout(() => {
            setCopied(false)
        }, 3000);
    }

    return (
        <div className='flex flex-col gap-[40px] mt-[60px] lg:mt-[0px] items-center justify-center w-full'>
            <div className="shadow-sm flex flex-col items-center justify-center w-[500px] sm:w-[650px] md:w-[760px] lg:w-[890px] h-[270px]" style={{ borderRadius : '25px' }}>
                <div className="info__container flex flex-col items-center lg:flex-row justify-center lg:justify-between p-[35px]">
                    <h1 
                        className={cn('text-[30px] sm:text-[38px] md:text-[40px] ld:text-[43px]', font.className)} 
                        style={{ color : '#0C359E', letterSpacing : '1px'}}
                    >
                        Unleash Your Creative Vision with Imaginify
                    </h1>
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true, 
                            animationData: animation
                        }}
                        style={{
                            width : '570px',
                        }}
                    />
                </div>
            </div>
            
            {/* Form container */}

            <div 
                className='flex flex-col gap-[100px] lg:flex-row justify-center lg:justify-start p-[10px]'
            >
                <div 
                    className="rounded-xl border cursor-pointer border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] testimonial_card p-4 w-[430px] h-[300px]"
                >
                    <FormSummarizer 
                        setSummaryText={setSummaryText} 
                        setIsFetching={setIsFetching}
                        setError={setError}
                    />
                </div>
                <div 
                    className="rounded-xl border flex items-center justify-center cursor-pointer border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] testimonial_card w-[430px] h-[100%] p-[10px]"
                >
                    {
                        !summaryText && !isFetching && !error && (
                            <h1 
                                className="text-muted-foreground text-center text-[17px] font-semibold"
                            >
                                {sentence}
                            </h1>
                        )
                    }
                    {
                        isFetching ? (
                            <div
                                className="w-full h-full flex flex-col items-center justify-center"
                            >
                                <p
                                    className="text-center text-muted-foreground"
                                >
                                    Please wait ....
                                </p>
                                <Image 
                                    src={loader} 
                                    alt="loader" 
                                    className='w-20 h-20 object-contain' 
                                /> 
                            </div>
                        ) : 
                        error ? (
                            <h2
                                className={cn("text-center text-muted-foreground", font.className)}
                            >
                                Well, that s wasn t supposed to happen...
                                <br />
                                <span className='font-normal text-gray-500'>
                                    {
                                        error?.data?.error
                                    }
                                </span>
                            </h2>
                        ) : (
                            <div className="flex flex-col gap-[10px]">
                                <h1
                                    className="font-semibold tracking-[0.6px] text-muted-foreground text-center text-[13px]"
                                >
                                    {
                                        summaryText.length > 100 ? 
                                            summaryText.substring(0, 660) + '...'
                                        :
                                        summaryText
                                    }
                                </h1>
                                {
                                    summaryText && 
                                    <Image 
                                        src={copy ? tickIcon : copyIcon}
                                        onClick={() => handleCopy(summaryText)} 
                                        alt="copy__icon"
                                        className="w-[30px] bg-[#EEF5FF] cursor-pointer p-1 rounded-xl "
                                    />
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard