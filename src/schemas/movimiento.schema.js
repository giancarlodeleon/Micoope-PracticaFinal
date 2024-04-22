import { z } from "zod";

export const MovimientoSchema = z.object({
    tipo: z.string({
        required_error: "Tipo is required"
    }),
    serie: z.string({
        required_error: "Serie is required"
    }),
    agencia: z.string({
        required_error: "Agencia is required"
    }),
    de: z.number({
        required_error: "De is not required"
    }),
    hasta: z.number ({
        required_error: "Hasta is not required"
    }),
    total: z.number ({
        required_error: "Total is required"
    }),
    saldo: z.number ({
        required_error: "Saldo is required"
    }),
    usado: z.number ({
        required_error: "Usado is required"
    }),

    date: z.string().datetime().optional(),
})
