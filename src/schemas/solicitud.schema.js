import { z } from "zod";

export const SolicitudSchema = z.object({
    nombre: z.string({
        required_error: "Nombre is required"
    }),
    estado: z.boolean({
        required_error: "Estado is required"
    }),
    cliente: z.string({
        required_error: "Cliente is required"
    }),
    descripcion: z.string({
        required_error: "Descripcion is required"
    }),
    
    date: z.string().datetime().optional(),
})