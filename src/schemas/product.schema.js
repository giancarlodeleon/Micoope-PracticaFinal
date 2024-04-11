import { z } from "zod";

export const ProductSchema = z.object({
    nombre: z.string({
        required_error: "Nombre requerido"
    }),
    precio_compra: z.number({
        required_error: "Precio de compra requerido"
    }),
    precio_venta: z.number({
        required_error: "Precio de venta requerido"
    }),
    date: z.string().datetime().optional(),
})