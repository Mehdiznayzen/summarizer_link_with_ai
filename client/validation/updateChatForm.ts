"use client"

import { z } from "zod"

export const updateChatForm = z.object({
    chatName: z.string(),
})
