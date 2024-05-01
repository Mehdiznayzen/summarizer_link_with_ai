"use client"

import { z } from "zod"

export const formContact = z.object({
    name: z.string().min(1,{ message : 'Name is required !!' }),
    email : z.string().email({ message : 'Enter a valid email !!'}),
    message : z.string().min(1, { message : 'The message is required !!' }).max(400)
})
