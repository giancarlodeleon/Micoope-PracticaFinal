import { z } from "zod";

export const GastoSchema = z.object({
    nombre: z.string({
        required_error: "Nombre is required"
    }),
    
    factura: z.string({
        required_error: "Nombre is required"
    }),

    tipo: z.string({
        required_error: "Nombre is required"
    }),

    precio: z.number({
        required_error: "Precio is required"
    }),
    
    date: z.string().datetime().optional(),
})