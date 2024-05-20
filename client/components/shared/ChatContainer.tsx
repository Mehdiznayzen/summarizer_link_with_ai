"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ThreeDots } from 'react-loader-spinner'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChatForm } from "@/validation/chatForm"
import { useEffect, useState } from "react"
import { IoSend } from "react-icons/io5";
import { useLazyGetSummaryQuery } from "@/services/SummarizeApi"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToastOptions, toast } from "react-toastify"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import user_icon from '@/public/images/user.png'
import bot_icon from '@/public/images/bot_icon.png'
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import loader from '@/public/icons/loader.svg'
import { cn } from "@/lib/utils"
import { Dancing_Script } from "next/font/google"
import { actions } from "@/services/Slice"
import copyIcon from '@/public/icons/copy.svg';
import tickIcon from '@/public/icons/tick.svg'
import { BiSolidLike } from "react-icons/bi";
import { checkUserPay } from "@/lib/actions/checkUserPay.action"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MdTranslate } from "react-icons/md"
import TranslationComponent from "./TranslationComponent"
import logo from '@/public/icons/logo-text.svg'
import DateFormat from "./DateFormat"
import { MdContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa";


interface ChatContainerProps{
    idCurrentChat : string,
    isActiveChat : boolean,
}

const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose : 8000,
    pauseOnHover : true,
    draggable : true,
    theme : 'dark'
}

const font = Dancing_Script({ 
    subsets: ["latin"],
    weight : ['400', '500', '600', '700'] 
});


const ChatContainer = ({ idCurrentChat, isActiveChat } : ChatContainerProps) => {
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const [getSummary, { isFetching }] = useLazyGetSummaryQuery();
    const { user } = useUser()
    const { loadingMessages, messages } = useSelector((state : any) => state.summarizer)
    const dispatch = useDispatch()
    const [copied, setCopied] = useState<boolean>(false)
    const [showTranslate, setShowTranslate] = useState<boolean>(false)

    // Use effect for fetching is user exist or not
    useEffect(() => {
        const checkUser = async () => {
            const result = await checkUserPay(user?.emailAddresses[0].emailAddress)
            if(result){
                setShowTranslate(true)
            }
        }
        checkUser()
    })
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value;
        setButtonDisabled(inputText.trim() === '')
    };

    const form = useForm<z.infer<typeof ChatForm>>({
        resolver: zodResolver(ChatForm),
        defaultValues: {
            URL : ''
        },
    })

    async function onSubmit(values: z.infer<typeof ChatForm>) {
        if (!isActiveChat) {
            toast.error('You need to activate a chat first !!', toastOptions);
        } else {
            try {
                const response = await getSummary({ url: values.URL });
                const data = response.data as { summary?: string };
        
                if (data && data.summary) {
                    const newMessage = {
                        user_message: values.URL,
                        ai_message: data.summary,
                        user_id: user?.id,
                        chat_id: idCurrentChat,
                    };
                    dispatch(actions.addMessages(newMessage))
                    await axios.post('http://127.0.0.1:8000/api/messages', newMessage);
                    
                    form.reset();
                } else {
                    toast.error('Summary not found or invalid data received.', toastOptions);
                }
            } catch (error: any) {
                toast.error('Error while fetching summary. Please Enter a valid URL.', toastOptions);
                console.log(error)
            }
        }
    }


    // function for add new like
    const addNewLike = async (id_chat : any, id_message : any) => {
        try {
            const newLike = {
                id_user : user?.id,
                id_chat : id_chat,
                id_message : id_message
            }
            const { data } = await axios.post('http://127.0.0.1:8000/api/likes', newLike)
            if(data.status === true){
                toast.success("I would like to thank you warmly 😊.", toastOptions);
            }else {
                toast.error(data.message, toastOptions)
            }
        } catch (error) {
            toast.error('Error. Please Try again.', toastOptions);
        }
    }

    const handleCopy = (copyUrl : any) => {
        setCopied(true);
        navigator.clipboard.writeText(copyUrl)
        toast.success('Your message is copied.', toastOptions)

        setTimeout(() => {
            setCopied(false);
        }, 3000)
    }


    return (
        <div className="flex flex-col items-center justify-between h-full w-full mt-2">

            {/* Chat Container */}
            <ScrollArea 
                className="flex flex-col gap-[7px] px-0 h-[560px] rounded-md w-full"
            >
                {
                    messages?.length === 0 && !loadingMessages && (
                        <div className="h-[560px] flex items-center justify-center">
                            <h1 
                                className={cn("text-[25px] text-muted-foreground", font.className)}
                            >
                                No messages Yet. Select a chat and Start Summarizing.
                            </h1>
                        </div>
                    )
                }
                {
                    loadingMessages ? (
                        <div className="flex flex-col w-full items-center h-[560px] justify-center">
                            <Image
                                src={loader}
                                alt="loader"
                                width={80}
                                height={80}
                            />
                            <p className={cn("text-[33px] text-[#40A2E3]", font.className)}>Loading....</p>
                        </div>
                    ) : (
                        messages?.map((message : any, index : any) => {
                            const { user_message, ai_message, created_at } = message
                            return (
                                <div 
                                    key={index} 
                                    className="flex flex-col gap-[17px] mt-3 w-full"
                                >
                                    <div
                                        className="rounded-xl flex flex-col border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] testimonial_card p-4"
                                    >
                                        <div 
                                            className="flex items-center gap-[10px]"
                                        >
                                            <Image
                                                src={user_icon}
                                                alt="user_logo"
                                                width={30}
                                                height={30}
                                            />
                                            <p className="text-muted-foreground text-[16px]">You</p>
                                        </div>
                                        <div className="mt-3">
                                            <p
                                                className="text-muted-foreground text-[13px] tracking-[1px]"
                                            >
                                                {user_message}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div
                                        className="rounded-xl flex flex-col border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] testimonial_card p-4"
                                    >
                                        <div 
                                            className="flex items-center gap-[10px]"
                                        >
                                            <Image
                                                src={bot_icon}
                                                alt="user_logo"
                                                width={30}
                                                height={30}
                                            />
                                            <p className="text-muted-foreground text-[16px]">Bot</p>
                                        </div>
                                        <div className="mt-3 text-muted-foreground text-[13px] tracking-[1px] flex flex-col gap-[7px]">
                                            <p>
                                                {ai_message}
                                            </p>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-[10px] items-center relative">
                                                    <div
                                                        onClick={() => handleCopy(ai_message)}
                                                        className="rounded-md cursor-pointer p-1 border-gray-200 hover:bg-white/20 hover:shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] testimonial_card"
                                                    >
                                                        {
                                                            copied ? <FaCheck /> : <MdContentCopy />
                                                        }
                                                    </div>

                                                    <div className="cursor-pointer">
                                                        <BiSolidLike
                                                            onClick={() => addNewLike(idCurrentChat, message.id)} 
                                                        />
                                                    </div>

                                                    {
                                                        showTranslate && (
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <MdTranslate 
                                                                        className="text-[15px] cursor-pointer"
                                                                    />
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader className="flex items-center justify-center flex-col gap-[5px]">
                                                                        <Image
                                                                            src={logo}
                                                                            width={160}
                                                                            height={160}
                                                                            alt="Logo"
                                                                            className='object-contain flex items-center justify-center cursor-pointer'
                                                                        />
                                                                        <AlertDialogDescription>
                                                                            Choose the language you want to translate into and enjoy 🥳✨❤️.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    
                                                                    <TranslationComponent
                                                                        message_id={message.id}
                                                                    />
                                                                    
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        )
                                                    }
                                                </div>
                                                <div className="">
                                                    <DateFormat created_at={created_at} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </ScrollArea>
            
            {/* Chat Form */}
            <div className="form_chat w-full">
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className="flex items-center justify-between p-1 border border-input rounded-lg"
                    >
                        <FormField
                            control={form.control}
                            name="URL"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter an URL..." 
                                            {...field} 
                                            className="w-full bg-transparent border-none"
                                            onInput={handleInputChange}
                                            type={'URL'}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button 
                            type="submit" 
                            disabled={isButtonDisabled}
                            variant={'btnChat'}
                        >
                            {
                                isFetching ? (
                                    <ThreeDots
                                        visible={true}
                                        height="40px"
                                        width="40px"
                                        color="#fff"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                    />
                                ) : (
                                    <IoSend />
                                )
                            }
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default ChatContainer