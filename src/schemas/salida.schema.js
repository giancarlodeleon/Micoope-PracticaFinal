import { z } from "zod";

export const SalidaSchema = z.object({
    agencia: z.string({
        required_error: "Agencia is required"
    }),
    tipo: z.string({
        required_error: "Tipo is required"
    }),
    serie: z.string({
        required_error: "Serie is required"
    }),
    cantidad: z.number({
        required_error: "Price is required"
    }),
    de: z.number({
        required_error: "De is not required"
    }),
    hasta: z.number({
        required_error: "Hasta is not required"
    }),
    comentario: z.string({
        required_error: "Comentario is not required"
    }),
    fecha: z.string().datetime().optional(),
})
