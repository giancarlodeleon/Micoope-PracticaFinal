import { z } from "zod";

export const SolicitudSchema = z.object({
    codigo: z.string({
        required_error: "Codigo is required"
    }),
    tipo: z.string({
        required_error: "Tipo is required"
    }),
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
    dias_credito: z.number({
        required_error: "Dias credito is required"
    }),
    nit: z.number({
        required_error: "NIT is required"
    }),

    observacion: z.string({
        required_error: "Observacion is required"
    }),
    
    date: z.string().datetime().optional(),
})