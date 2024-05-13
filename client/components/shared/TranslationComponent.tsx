'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getMessage } from "@/lib/actions/fetchMessage.action"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios"
import { Loader } from "lucide-react"
import { ToastOptions, toast } from "react-toastify"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose : 8000,
    pauseOnHover : true,
    draggable : true,
    theme : 'dark'
}

interface TranslationComponentProps {
    message_id : number
}


const selectSchema = z.object({
    language: z.string()
})

const TranslationComponent = ({ message_id } : TranslationComponentProps) => {
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [messageTranslated, setMessageTranslated] = useState<string>('')

    const form = useForm<z.infer<typeof selectSchema>>({
        resolver: zodResolver(selectSchema),
    })

    useEffect(() => {
        const fetchMessage = async () => {
            const response = await getMessage(message_id)
            if(!response){
                return null
            }
            setMessage(response.ai_message)
        }
        fetchMessage()

    }, [message])    

    async function onSubmit(values: z.infer<typeof selectSchema>) {
        if(!values.language){
            toast.error('You must a choose the language !!', toastOptions)
        }else {
            setIsLoading(true)
            const options = {
                method: 'POST',
                url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'b4530ce3b7msh4362ecd9634cc77p174a32jsnec5018c1f186',
                    'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
                },
                data: {
                    from: 'en',
                    to: values.language,
                    q: message,         
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setMessageTranslated(response.data)
            } catch (error) {
                console.error(error);
            }finally {
                setIsLoading(false)
            }
        }
    }


    return (
        <section className="flex flex-col gap-[10px]">
            <div className="w-full flex items-center justify-between">
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className="flex items-center justify-between w-full"
                    >
                        <FormField
                            control={form.control}
                            name="language"
                            render={({ field }) => (
                                <FormItem>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-[190px]">
                                                <SelectValue placeholder="Select a Language" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={'fr'}>FR</SelectItem>
                                            <SelectItem value={'ar'}>AR</SelectItem>
                                            <SelectItem value={'it'}>IT</SelectItem>
                                            <SelectItem value={'es'}>ES</SelectItem>
                                            <SelectItem value={'de'}>DE</SelectItem>
                                            <SelectItem value={'ru'}>RU</SelectItem>
                                            <SelectItem value={'zh-CN'}>zh-CN</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        {
                            isLoading ? (
                                <Button
                                    type="submit"
                                    variant={'outline'}
                                    className="hover:text-accent-foreground bg-[#864AF9] text-white flex gap-[4px]"
                                >
                                    <Loader 
                                        className="animate-spin"
                                    />
                                    translating...
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    variant={'outline'}
                                    className="hover:text-accent-foreground bg-[#864AF9] text-white"
                                >
                                    Translate
                                </Button>
                            )
                        }
                    </form>
                </Form>
            </div>

            <ScrollArea 
                className="px-0 h-[260px] w-full rounded-xl flex flex-col border cursor-pointer border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] testimonial_card p-4"
            >
                <p className="text-[12px]">
                    {  
                        messageTranslated ? messageTranslated : message
                    }
                </p>
            </ScrollArea>
        </section>
    )
}

export default TranslationComponent