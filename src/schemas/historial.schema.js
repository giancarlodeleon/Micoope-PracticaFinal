import { z } from "zod";

export const HistorialSchema = z.object({
    tipo: z.string({
        required_error: "Tipo is required"
    }),
    descripcion: z.string({
        required_error: "Descripcion is required"
    }),
    
    cantidad: z.number({
        required_error: "Cantidad Price is required"
    }),
    cliente: z.string({
        required_error: "Cliente is required"
    }),
    
    date: z.string().datetime().optional(),
})