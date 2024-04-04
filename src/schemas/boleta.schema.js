import { z } from "zod";

export const BoletaSchema = z.object({
    tipo_boleta: z.string({
        required_error: "Tipo de boleta is required"
    }),
    serie: z.string({
        required_error: "Serie is required"
    }),
    de: z.number({
        required_error: "De is required"

    }),
    hasta: z.number({
        required_error: "Hasta is required"

    }),
    existencia: z.number({
        required_error: "Existencia is required"
    }),
    date: z.string().datetime().optional(),
    
    
})