'use client';

import Sidebar from '@/components/shared/Sidebar';
import { Provider } from 'react-redux';
import { Store } from "@/services/Store";
import ChatContainer from '@/components/shared/ChatContainer';
import { useState } from 'react';

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ChevronLeft, GanttChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'

const Imaginify = () => {
    const [isActiveChat, setIsActiveChat] = useState<boolean>(false)
    const [idCurrentChat, setIdCurrentChat] = useState<string>('')
    const router = useRouter()

    return (
        <Provider store={Store}>
            <section 
                className="imaginify__container"
            >
                <div className="link_home flex items-center justify-center">
                    <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => router.push('/')}
                    >
                        <ChevronLeft
                            className="h-4 w-4" 
                        />
                    </Button>
                </div>
                <div 
                    className="w-[500px] relative sm:w-[780px]  lg:w-[1000px] xl:w-[1200px] h-[92vh] bg-[#F6F5F5] rounded-xl shadow-md flex"
                >
                    
                    {/* Sidebar for desktop screen */}
                    <div 
                        className="side-bar w-[300px] shadow-md bg-[#B5C0D0] hidden xl:block" 
                        style={{ borderRadius : '12px 0px 0px 12px'}}
                    >
                        <Sidebar 
                            setIdCurrentChat={setIdCurrentChat}
                            setIsActiveChat={setIsActiveChat}
                        />
                    </div>

                    {/* Sidebar for mobile screen */}
                    <div className="block xl:hidden absolute left-4 top-2">
                        <Sheet>
                            <SheetTrigger asChild className="border-2">
                                <GanttChart
                                    className="block w-[30px] h-[30px] transition-all xl:hidden rounded-md cursor-pointer p-1 border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] testimonial_card"
                                />
                            </SheetTrigger>
                            <SheetContent side={'left'} className='bg-[#B5C0D0]'>
                                <Sidebar 
                                    setIdCurrentChat={setIdCurrentChat}
                                    setIsActiveChat={setIsActiveChat}
                                />
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Chat Container */}
                    <div className="results w-full h-full p-[30px] rounded-md">
                        <ChatContainer 
                            idCurrentChat={idCurrentChat}
                            isActiveChat={isActiveChat}
                        />
                    </div>
                </div>
            </section>
        </Provider>

    )
}

export default Imaginify