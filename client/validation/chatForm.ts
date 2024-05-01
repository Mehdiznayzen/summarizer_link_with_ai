import { z } from "zod";

export const ChatForm = z.object({
    URL: z.string(),
})