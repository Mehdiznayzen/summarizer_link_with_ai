import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ContactForm from "./ContactForm"
import logo from '@/public/icons/logo-text.svg'
import Image from 'next/image';


export function ContactCard() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    variant="purple"
                >
                    Contact Us
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="flex flex-col gap-[15px]">
                    <DialogTitle className="flex flex-col items-center justify-center gap-[10px]">
                        <Image
                            src={logo}
                            width={160}
                            height={160}
                            alt="Logo"
                            className='object-contain'
                        />
                        <div className="text-center text-muted-foreground tracking-[1px]">Start chating with me now</div>
                    </DialogTitle>
                </DialogHeader>
                <ContactForm />
            </DialogContent>
        </Dialog>
    )
}
