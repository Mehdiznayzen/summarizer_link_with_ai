'use client';

import { userValidation } from "@/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import axios from "axios";
import { ToastOptions, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface AccountFormProps {
    userData : {
        id: any,
        username: any,
        email : any,
        bio : any, 
        image : any
    }
}

const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose : 8000,
    pauseOnHover : true,
    draggable : true,
    theme : 'dark'
}

const AccountForm = ({ userData }: AccountFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const router = useRouter()
    const { startUpload } = useUploadThing('media')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm({
        resolver: zodResolver(userValidation),
        defaultValues: {
            id : userData.id,
            username: userData?.username ? userData.username : '',
            email: userData?.email ? userData.email : '',
            bio: userData?.bio ? userData.bio : '',
            image: userData?.image ? userData.image : '',
        }
    })

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {        
        const fileReader = new FileReader()
        
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0]
            setFiles(Array.from(e.target.files))
            
            if(!file.type.includes('image')){
                return;
            }
            
            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || ""
                
                fieldChange(imageDataUrl)
            }
            fileReader.readAsDataURL(file)
        }
    }

    const onSubmit = async (values: z.infer<typeof userValidation>) => {
        const email = await values.email
        const username = await values.username
        try {
            setIsLoading(true)
            const blob = values.image
            const hasImageChanged = isBase64Image(blob);
            if (hasImageChanged) {
                const imgRes = await startUpload(files);
                
                if (imgRes && imgRes[0].url) { 
                    values.image = imgRes[0]?.url;
                }            
            }
            if(!values.id || !values.username || !values.email || !values.bio || !values.image){
                toast.error('Please fill the fields first and try again !!', toastOptions)
                return ;
            }
            
            const response = await axios.post('http://127.0.0.1:8000/api/users', values)
            
            if (response.data.status === false) {
                toast.error(response.data.message, toastOptions)
            }else {
                await axios.post('api/send', {
                    email, 
                    username
                })
                router.push('/')
            }
        }catch (error: any) {
            throw new Error(error.message)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <Form
            {...form}
        >
            <form
                className='flex flex-col justify-start gap-10 w-[600px]'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>
                            <FormLabel className='account-form_image-label'>
                                {
                                    field.value ? (
                                        <Image
                                            src={field.value}
                                            alt='profile_icon'
                                            width={96}
                                            height={96}
                                            priority
                                            className='rounded-full object-contain'
                                        />
                                    ) : (
                                        <Image
                                            src='/assets/profile.svg'
                                            alt='profile_icon'
                                            width={24}
                                            height={24}
                                            className='object-contain'
                                        />
                                    )
                                }
                                </FormLabel>
                                <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                    <Input
                                        type='file'
                                        accept='image/*'
                                        placeholder='Add profile photo'
                                        className='account-form_image-input'
                                        onChange={(e) => handleImage(e, field.onChange)}
                                    />
                                </FormControl>
                            </FormItem>
                        )
                    }
                />

                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='account-form_input no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='account-form_input no-focus'
                                    {...field}
                                    disabled={true}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='bio'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Bio
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={10}
                                    className='no-focus'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type='submit'
                    variant={'btnChat'}
                    disabled={isLoading}
                >
                    { 
                        isLoading ? 'Submitting...' : 'Continue'
                    }
                </Button>

            </form>
        </Form>
    )
}

export default AccountForm