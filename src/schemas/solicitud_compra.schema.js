import { z } from "zod";

export const SolicitudCompraSchema = z.object({
    codigo: z.string({
        required_error: "Codigo is required"
    }),
    tipo: z.string({
        required_error: "Tipo is required"
    }),
    nombre: z.string({
        required_error: "Nombre is required"
    }),
    proveedor: z.string({
        required_error: "Proveedor is required"
    }),
    descripcion: z.string({
        required_error: "Descripcion is required"
    }),
    nit: z.number({
        required_error: "NIT is required"
    }),
    
    date: z.string().datetime().optional(),
})