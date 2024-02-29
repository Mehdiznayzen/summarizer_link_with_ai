'use client'

import { Box } from "@chakra-ui/react"
import Sidebar from '@/components/shared/SideBar';
import MobileSidebar from "@/components/shared/MobileSidebar";
import { Provider } from "react-redux";
import { Store } from "@/services/Store";


const Dashboard = ({ children } : { children : React.ReactNode }) => {
    return ( 
        <Box className="flex min-h-screen w-full flex-col bg-[#F6F5F5] lg:flex-row">
            <Sidebar />
            <MobileSidebar />

            <Provider store={Store}>
                <div className="mt-8 flex w-full justify-center py-8 lg:mt-0 lg:min-h-screen lg:py-10">
                    { children }
                </div>
            </Provider>
        </Box>
    )
}

export default Dashboard