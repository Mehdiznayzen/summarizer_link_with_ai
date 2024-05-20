"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import emailjs from "@emailjs/browser";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formContact } from "@/validation/ValidateContactForm"
import { useState } from "react"
import axios from 'axios'
import { useUser } from "@clerk/nextjs";
import { Textarea } from "./ui/textarea";

const toastOptions = {
    position: "top-right" as "top-right",
    autoClose : 8000,
    pauseOnHover : true,
    draggable : true,
    theme : 'dark'
}

function ContactForm() {
    const [isSending, setIsSending] = useState(false)
    const { user } = useUser()

    const form = useForm<z.infer<typeof formContact>>({
        resolver: zodResolver(formContact),
        defaultValues: {
            name : '',
            email : '',
            message : ''
        },
    })

    async function handleSubmit(values: z.infer<typeof formContact>) {
        setIsSending(true)

        if(!user){
            toast.error("Ahh, You have to be login. Please sign in.", toastOptions)
            setIsSending(false)
        }else {
            emailjs.send(
                'service_8im5319',
                'template_p2mk507',
                {
                    from_name : values.name,
                    to_name : "Mehdi",
                    from_email : values.email,
                    to_email : 'mehdiznayzen@gmail.com',
                    message : values.message
                },
                'iYqZQ0Q_aQ1_7Y9nX'
            )
    
            .then(async () => {
                const newContact = {
                    name : values.name,
                    email : values.email,
                    message : values.message
                }
                await axios.post('http://127.0.0.1:8000/api/contact', newContact)
                toast.success("Thank you. I will get back to you as soon as possible.", toastOptions)
                setIsSending(false);
            })
            
            .catch((error) => {
                setIsSending(false);
                console.error(error);
                toast.error("Ahh, something went wrong. Please try again.", toastOptions)
            })
        }

    }

    return (
        <Form 
            {...form}
        >
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your name</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Ex : Mehdi Znayzen" 
                                    type="text"
                                    disabled={isSending}
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Email</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder={'Enter you email : '} 
                                    type="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your message</FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={5}
                                    className='no-focus'
                                    {...field}
                                    placeholder="Ex: Hi ! Mehdi"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit" 
                    variant={'purple'}
                    disabled={isSending}
                >
                    { 
                        isSending ? 'Submitting...' : 'Submit' 
                    }
                </Button>
                
                <Button 
                    type="reset" 
                    variant={'ghost'}
                >
                    Reset
                </Button>
            </form>
        </Form>
    )
}

export default ContactForm