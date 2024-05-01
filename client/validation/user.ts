import { z } from "zod"

export const userValidation = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    bio : z.string(),
    image: z.string()
})
