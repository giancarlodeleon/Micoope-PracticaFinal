import { z } from "zod";

export const ProductSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }),
    price: z.number({
        required_error: "Price is required"
    }),
    date: z.string().datetime().optional(),
})