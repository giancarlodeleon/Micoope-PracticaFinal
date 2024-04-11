import { z } from "zod";

export const GastoSchema = z.object({
    nombre: z.string({
        required_error: "Nombre es Requerido"
    }),
    precio: z.number({
        required_error: "Precio es requerido"
    }),
    date: z.string().datetime().optional(),
})