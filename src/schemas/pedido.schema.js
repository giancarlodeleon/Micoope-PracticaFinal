import { z } from "zod";

export const PedidoSchema = z.object({
    nombre: z.string({
        required_error: "Nombre is required"
    }),
    
    producto: z.string({
        required_error: "Producto is required"
    }),
    cantidad: z.number({
        required_error: "Cantidad is required"
    }),
    total: z.number({
        required_error: "Total is required"
    }),
    
    date: z.string().datetime().optional(),
})