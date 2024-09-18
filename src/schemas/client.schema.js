import { z } from "zod";

export const ClientSchema = z.object({
    code: z.string({
        required_error: "Code is required"
    }),

    nit: z.number({
        required_error: "Nit is required"
    }),

    name: z.string({
        required_error: "Name is required"
    }),

    type: z.string({
        required_error: "Type is required"
    }),

    email: z.string({
        required_error: "Email is required"
    }),

    social: z.string({
        required_error: "Social is required"
    }),
    department: z.string({
        required_error: "Department is required"
    }),

    municipio: z.string({
        required_error: "Municipio is required"
    }),

    direction: z.string({
        required_error: "Direction is required"
    }),

    reference: z.string({
        required_error: "Reference is required"
    }),

    phone: z.number({
        required_error: "Phone is required"
    }),
    
    plazo_credito: z.string({
        required_error: "Plazo Credito is required"
    }),

    factura: z.string({
        required_error: "Factura is required"
    }),

    nota: z.string({
        required_error: "Nota is required"
    }),

    date: z.string().datetime().optional(),
})