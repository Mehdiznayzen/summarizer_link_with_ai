import { Box } from "@chakra-ui/react"
import Image from 'next/image'
import logo from '@/public/images/logo-text.svg'
import { Separator } from "./ui/separator"
import { Dancing_Script } from 'next/font/google';
import { cn } from "@/lib/utils";
import { Link__footer, Link__footer2, icons__footer } from "@/constants";
import Link from "next/link";


const font = Dancing_Script({ 
    subsets: ["latin"],
    weight : ['400', '500', '600', '700'] 
});

const Footer = () => {
    return (
        <footer className="px-6 sm:px-10 lg:px-16 flex flex-col pb-[40px]" style={{ position : 'relative', top : '170px'}}>
            <Box className="logo__container flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between py-[30px]">
                <Image
                    src={logo}
                    alt="logo_footer"
                    width={145} 
                    height={145}
                    className="cursor-pointer"
                />
                <div className="flex gap-[120px]">
                    {/* First Links */}
                    <ul className="flex flex-col gap-[10px]">
                        <p className={cn("text-muted-foreground text-[20px]", font.className)}>Products</p>
                        {
                            Link__footer.map((item) => {
                                const { id, link } = item
                                return (
                                    <li className="text-[13px] cursor-pointer hover:text-slate-900" key={id}>{link}</li>
                                )
                            })
                        }
                    </ul>

                    {/* Second Links */}
                    <ul className="flex flex-col gap-[10px]">
                        <p className={cn("text-muted-foreground text-[20px]", font.className)}>Company</p>
                        {
                            Link__footer2.map((item) => {
                                const { id, link } = item
                                return (
                                    <li className="text-[13px] cursor-pointer hover:text-slate-700" key={id}>{link}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </Box>
            <Separator />
            <Box className="py-[30px] flex flex-col lg:flex-row items-center justify-center lg:justify-between p-[30px]">
                <h1 className={cn("text-[16px] font-semibold", font.className)}>
                    &copy; 2024 Mehdi, Inc.
                </h1>
                <div className="flex items-center gap-[10px]">
                    {
                        icons__footer.map((item) => {
                            const { icon, id, url } = item
                            return (
                                <Link 
                                    href={url} 
                                    key={id} 
                                    className="text-muted-foreground hover:text-slate-700 text-[20px] transition-all hover:scale-75"
                                    target={"_blank"}
                                    >
                                        {icon}
                                </Link>
                            )
                        })
                    }
                </div>
            </Box>
        </footer>
    )
}

export default Footer