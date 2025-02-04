import { z } from "zod";

export const PedidoCompraSchema = z.object({
    solicitud: z.string({
        required_error: "Nombre is required"
    }),
    
    producto: z.string({
        required_error: "Producto is required"
    }),
    cantidad: z.number({
        required_error: "Cantidad is required"
    }),
    presentacion: z.string({
        required_error: "Presentacion is required"
    }),

    date: z.string().datetime().optional(),
})