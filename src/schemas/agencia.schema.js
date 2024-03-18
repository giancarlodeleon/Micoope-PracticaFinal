import { z } from "zod";

export const AgenciaSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }),
    code: z.string({
        required_error: "Code is required"
    }),
    date: z.string().datetime().optional(),
})