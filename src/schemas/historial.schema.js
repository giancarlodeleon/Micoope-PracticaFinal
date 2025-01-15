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

    tipo_pago: z.string({
        required_error: "Tipo de pago is required"
    }),

    banco: z.string({
        required_error: "Banco is required"
    }),

    num_doc: z.string({
        required_error: "Numero de Documento is required"
    }),

    recibo: z.string({
        required_error: "Recibo is required"
    }),
    
    date: z.string().datetime().optional(),
})