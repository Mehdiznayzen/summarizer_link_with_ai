'use client'

import { useUser } from "@clerk/nextjs"
import { Button } from "../ui/button"
import { LogOut, Plus } from 'lucide-react'
import Image from 'next/image'
import logo from '@/public/icons/logo-icon.png'
import { useDispatch, useSelector } from "react-redux"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { 
    Dispatch, 
    SetStateAction, 
    useEffect, 
    useState 
} from "react"
import logo2 from '@/public/icons/logo-text.svg'
import { ToastOptions, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Dancing_Script } from 'next/font/google';
import { cn } from "@/lib/utils"
import { FaTrash } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import logo3 from '@/public/icons/logo-text.svg'
import { actions, getAllmessages } from "@/services/Slice"
import { AppDispatch } from "@/services/Store"
import { getAllchats } from '@/services/Slice';
import { DNA } from "react-loader-spinner"
import FormUpdateChat from "./FormUpdateChat"
import { useAuth } from '@clerk/nextjs'
import { useRouter } from "next/navigation"
import { checkUserPay } from "@/lib/actions/checkUserPay.action"
import { FaBagShopping } from "react-icons/fa6"

const font = Dancing_Script({ 
    subsets: ["latin"],
    weight : ['400', '500', '600', '700'] 
});


const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose : 8000,
    pauseOnHover : true,
    draggable : true,
    theme : 'dark'
}

interface SidebarProps {
    setIdCurrentChat : Dispatch<SetStateAction<string>>,
    setIsActiveChat : Dispatch<SetStateAction<boolean>>,
}

const Sidebar = ({ setIdCurrentChat, setIsActiveChat } : SidebarProps) => {
    const { user } = useUser()
    const dispatch : AppDispatch = useDispatch()
    const [nameChat, setNameChat] = useState<string>('')
    const [activeChat, setActiveChat] = useState<string>('')
    const { chats, loadingChats } = useSelector((state : any) => state.summarizer)
    const [chatUpdate, setChatUpdate] = useState<string>('')
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
    const { signOut } = useAuth()
    const router = useRouter()
    const [showUpgradePlan, setShowUpgradePlan] = useState<boolean>(true)

    useEffect(() => {
        const checkUser = async () => {
            const result = await checkUserPay(user?.emailAddresses[0].emailAddress)
            if(result){
                setShowUpgradePlan(false)
            }
        }
        checkUser()
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (nameChat === '') {
            toast.error('You need to enter a name for your chat !!', toastOptions)
        } else {
            const newChat = {
                chatName: nameChat,
                id_user: user?.id
            }
            try {
                dispatch(actions.addChat(newChat))
                await axios.post('http://127.0.0.1:8000/api/chats', newChat);
                document.getElementById('dialog-trigger-button')?.click();
                toast.success('Your chat is created.', toastOptions)
                location.reload()
            } catch (error) {
                console.error('Error adding chat:', error);
            }
        }
    }

    // function for deleting a chat
    const deleteChat = async (id: any) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/chats/${id}`);
        
            if (response.data.status === true) {
                toast.success('Your chat is deleted.', toastOptions);
                location.reload()
            } else {
                toast.error('Failed to delete chat. Please try again.', toastOptions);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.', toastOptions);
        }
    }    

    // UseEffect for get all the chats
    useEffect(() => {
        const fetchData = async () => {
            if(user?.id){
                try {
                    dispatch(getAllchats(user?.id))
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }
        };
        fetchData();
    }, [user]);

    // Function for get the value of the chat we want to update
    const getChatName = async (chatId : any) => {
        setLoadingUpdate(true)
        await axios.get(`http://127.0.0.1:8000/api/chats/${chatId}`)
        .then((response) => {
            setChatUpdate(response.data.chat.chatName)
            setLoadingUpdate(false)
        })
        .catch((error) => console.log(error))
    }

    // function for updating a chat
    const updateChat = async (chatId : any, chatUpdate: any) => {
        try {
            if (!chatUpdate) {
                toast.error('You need to enter a name for your chat!!', toastOptions);
                return;
            }
            await axios.patch(`http://127.0.0.1:8000/api/chats/${chatId}`, {
                chatName: chatUpdate,
            });
            toast.success("You're chat is updated .", toastOptions);
            location.reload()
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while updating the chat.', toastOptions);
        }
    };
    
    return (
        <div
            className="flex p-[14px] flex-col items-center justify-between gap-[10px]"
        >
            <div className="flex items-center justify-center w-full">
                <Image
                    src={logo3}
                    alt="logo"
                    width={140}
                    height={140}
                    className="object-contain"
                />
            </div>
            <div 
                className="btn flex items-center justify-center"
            >
                <Dialog>
                    <DialogTrigger asChild>
                        <Button 
                            variant={'sidebarBtn'}
                            className="flex items-center text-black bg-none justify-between w-[200px]"
                            id="dialog-trigger-button"
                        >
                            <div className='flex items-center gap-[7px]'>
                                <Image 
                                    src={logo}
                                    alt="logo"
                                    width={23}
                                    height={23}
                                />
                                <span>
                                    New Chat
                                </span>
                            </div>
                            <Plus className="w-[20px] h-[20px]" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                            <DialogTitle className="flex flex-col items-center justify-center gap-[10px]">
                                <Image
                                    src={logo2}
                                    width={160}
                                    height={160}
                                    alt="Logo"
                                    className='object-contain'
                                />
                                <p className="text-center text-muted-foreground text-[17px]">Add a new chat Here</p>
                            </DialogTitle>
                        </DialogHeader>
                            <form 
                                className="flex flex-col gap-[15px]" 
                                onSubmit={handleSubmit}
                            >
                                <Input 
                                    placeholder="Enter the name of chat" 
                                    type="text"
                                    value={nameChat}
                                    onChange={(e) => setNameChat(e.target.value)}
                                />
                                <Button type="submit" variant={'btnChat'}>Valid</Button>
                            </form>
                    </DialogContent>
                </Dialog>
            </div>

            <ScrollArea className="h-[525px] w-full flex flex-col justify-center rounded-md p-4 overflow-auto gap-[18px]">
                {
                    loadingChats ? (
                        <div className="flex items-center justify-center h-[525px] w-full">
                            <DNA
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center gap-[10px]">
                            <h1 
                                className={
                                    cn("text-[30px] bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent my-1 flex items-center justify-center", font.className)
                                }
                            >
                                Your Chats
                            </h1>
                            {
                                Array.isArray(chats) ? (
                                    chats.map((chat: any) => {
                                        const { id, chatName } = chat;
                                        return (
                                            <div 
                                                className={cn(`w-full flex items-center justify-between border border-input text-center text-[20px] font-semibold rounded-md p-1 cursor-pointer transition-all text-muted-foreground ${
                                                    activeChat === chat.chatName && 'bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-white border-0'
                                                }`, font.className)} 
                                                key={id}
                                                onClick={async () => {
                                                    setActiveChat(chatName);
                                                    setIdCurrentChat(id);
                                                    setIsActiveChat(true);
                                                    try {
                                                        await dispatch(getAllmessages(id));
                                                    } catch (error) {
                                                        console.error('Error dispatching getAllmessages:', error)
                                                    }
                                                }}
                                            >
                                                <p                                           
                                                    className="ml-2"
                                                >
                                                    {
                                                        chatName.length > 20 ? `${chatName.substring(0, 19)}...` : chatName
                                                    }
                                                </p>
                                                <div className="flex items-center gap-[6px]">
                                                    <AlertDialog >
                                                        <AlertDialogTrigger asChild>
                                                            <MdOutlineEdit 
                                                                className="text-[15px]" 
                                                                onClick={() => getChatName(id)}
                                                            />
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently delete your
                                                                    chat and remove your data from our servers.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <FormUpdateChat 
                                                                chatUpdate={chatUpdate}
                                                                setChatUpdate={setChatUpdate}
                                                                loadingUpdate={loadingUpdate}
                                                            />
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction 
                                                                    onClick={() => updateChat(id, chatUpdate)} 
                                                                    className="hover:text-accent-foreground bg-[#864AF9] text-white"
                                                                >
                                                                    Update
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>

                                                    <AlertDialog >
                                                        <AlertDialogTrigger asChild>
                                                            <FaTrash className="text-[15px]" />
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently delete your
                                                                    chat and remove your data from our servers.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => deleteChat(id)} className="hover:text-accent-foreground bg-[#864AF9] text-white">Delete</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>
                                        );
                                    }
                                )
                            ) : (
                                typeof chats === 'object' && !Array.isArray(chats) && Object.keys(chats).length > 0 ? (
                                    Object.keys(chats).map((key) => {
                                        const chat = chats[key];
                                        return (
                                            <div 
                                                className={cn(`w-full flex items-center justify-between border border-input text-center text-[20px] font-semibold rounded-md p-1 cursor-pointer transition-all text-muted-foreground ${
                                                    activeChat === chat.chatName && 'bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-white border-0'
                                                }`, font.className)}
                                                key={chat.id}
                                                onClick={async () => {
                                                    setActiveChat(chat.chatName)
                                                    setIdCurrentChat(chat.id)
                                                    setIsActiveChat(true)
                                                    try {
                                                        await dispatch(getAllmessages(chat.id));
                                                    } catch (error) {
                                                        console.error('Error dispatching getAllmessages:', error);
                                                    }
                                                }}
                                            >
                                                <p           
                                                    className="ml-2"
                                                >
                                                    {
                                                        chat.chatName.length > 20 ? `${chat.chatName.substring(0, 19)}...` : chat.chatName
                                                    }
                                                </p>
                                                <div className="flex items-center gap-[6px]">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <MdOutlineEdit 
                                                                className="text-[15px]"
                                                                onClick={() => getChatName(chat.id)}
                                                            />
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently update your chat.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <FormUpdateChat 
                                                                chatUpdate={chatUpdate}
                                                                setChatUpdate={setChatUpdate}
                                                                loadingUpdate={loadingUpdate}
                                                            />
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction 
                                                                    onClick={() => updateChat(id, chatUpdate)} 
                                                                    className="hover:text-accent-foreground bg-[#864AF9] text-white"
                                                                >
                                                                    Update
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>

                                                    <AlertDialog >
                                                        <AlertDialogTrigger asChild>
                                                            <FaTrash className="text-[15px]" />
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently delete your
                                                                    chat and remove your data from our servers.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => deleteChat(chat.id)} className="hover:text-accent-foreground bg-[#864AF9] text-white">Delete</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : null
                            )}
                        </div>
                    )
                }
                {
                    chats.length === 0 && (
                        <div className="flex items-center justify-center h-[525px]">
                            <p 
                                className={cn('text-[26px] text-black', font.className)}
                            >
                                No Chat available
                            </p>
                        </div>
                    )
                }
            </ScrollArea>

            <div className="flex items-center justify-between gap-[10px]">
                <div className="flex items-center gap-[30px]">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={async () => {
                            router.push('/')
                            await signOut();              
                        }}
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>

                    {
                        showUpgradePlan && (
                            <Button
                                variant="outline"
                                className="flex items-center gap-1"
                                size="icon"
                                onClick={async () => {
                                    router.push('/credits')
                                }}
                            >
                                <FaBagShopping className="text-[17px]"/>
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar