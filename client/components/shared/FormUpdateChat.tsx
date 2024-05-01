import { Dispatch, SetStateAction } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { updateChatForm } from "@/validation/updateChatForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface FormUpdateChat {
    chatUpdate : string
    setChatUpdate : Dispatch<SetStateAction<string>>,
    loadingUpdate : boolean
}

const FormUpdateChat = ({ chatUpdate, setChatUpdate, loadingUpdate } : FormUpdateChat) => {
    
    const form = useForm<z.infer<typeof updateChatForm>>({
        resolver: zodResolver(updateChatForm),
        defaultValues: {
            chatName : ''
        },
    })
    
    return (
        <Form {...form}>
            <form className="space-y-8 w-full" onSubmit={(e) => e.preventDefault()}>
                <FormField
                    control={form.control}
                    name="chatName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Chat name</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Enter a name for your chat" 
                                    type="text"
                                    {...field} 
                                    value={chatUpdate}
                                    onChange={(e) => setChatUpdate(e.target.value)}
                                    disabled={loadingUpdate}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default FormUpdateChat