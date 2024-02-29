"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { useLazyGetSummaryQuery } from "@/services/SummarizeApi"
import { useEffect } from "react"

const formSchema = z.object({
    url: z.string().min(2, { message : 'URL is required !!'}),
    language : z.string()
})

const languages = [
    { value: 'EN', label: 'EN' },
    { value: 'AR', label: 'AR' },
    { value: 'FR', label: 'FR' },
    { value: 'CA', label: 'CA' },
    { value: 'HE', label: 'HE' },
    { value: 'AM', label: 'AM' },
    { value: 'SK', label: 'SK' },
    { value: 'IT', label: 'IT' },
    { value: 'HU', label: 'HU' },
    { value: 'FI', label: 'FI' },
] as const

export function FormSummarizer({ setSummaryText, setIsFetching, setError } : any) {
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url : '',
            language : ''
        },
    })

    useEffect(() => {
        setIsFetching(isFetching)
        setError(error)
    }, [getSummary, isFetching, error, setError, setIsFetching])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { data } = await getSummary({ url : values.url, language : values.language.toLowerCase()})
        if(data?.summary){
            setSummaryText(data?.summary)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL : </FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Enter an URL" 
                                    {...field} 
                                    disabled={isFetching}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Language</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[100%] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                        {
                                            field.value
                                                ? languages.find(
                                                    (language) => language.value === field.value
                                                )?.label
                                            : "Select language"}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[100%] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search language..."
                                            className="h-9"
                                        />
                                        <CommandEmpty>No language found.</CommandEmpty>
                                        <CommandGroup>
                                            {
                                                languages.map((language) => (
                                                        <CommandItem
                                                            value={language.label}
                                                            key={language.value}
                                                            onSelect={() => {
                                                                form.setValue("language", language.value)
                                                            }}
                                                        >
                                                            {language.label}
                                                            <CheckIcon
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    language.value === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                    )
                                                                }
                                                            />
                                                        </CommandItem>
                                                    ))
                                                }
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        
                <Button 
                    type="submit" 
                    variant={'purple'}
                    disabled={isFetching}
                >
                        Submit
                </Button>
            </form>
        </Form>
    )
}
