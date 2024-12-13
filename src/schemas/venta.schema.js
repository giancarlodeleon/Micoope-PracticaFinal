import { z } from "zod";

export const VentaSchema = z.object({
    numero: z.number({
        required_error: "Numero is required"
    }),
    
    numero_factura: z.number({
        required_error: "Numero de factura is required"
    }),

    FEL_serie: z.string({
        required_error: "FEL serie  is required"
    }),

    FEL_numero: z.number({
        required_error: "FEL numero is required"
    }),

    monto: z.number({
        required_error: "Monto is required"
    }),

    pendiente: z.number({
        required_error: "Pendiente is required"
    }),

    fecha_pago: z.string({
        required_error: "Fecha de pago is required"
    }).datetime(),
    
    date: z.string().datetime().optional(),
})