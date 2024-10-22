import { z } from "zod";

export const ProductSchema = z.object({
    code: z.string({
        required_error: "Code is required"
    }),
    name: z.string({
        required_error: "Name is required"
    }),
    presentation: z.string({
        required_error: "Presentation is required"
    }),
    cost_price: z.number({
        required_error: "Cost Price is required"
    }),
    selling_price_1: z.number({
        required_error: "Selling Price 1 is required"
    }),
    selling_price_2: z.number({
        required_error: "Sellng Price 2 is required"
    }),
    selling_price_3: z.number({
        required_error: "Selling Price 3 is required"
    }),
    minimum_stock: z.number({
        required_error: "Minimum stock is required"
    }),
    comision: z.boolean({
        required_error: "Comision stock is required"
    }),
    stock: z.number({
        required_error: "Stock is required"
    }),
    
    date: z.string().datetime().optional(),
})