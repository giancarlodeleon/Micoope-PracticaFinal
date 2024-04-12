import { z } from "zod";

export const DatoSchema = z.object({
    hora: z.number({
        required_error: "hora es Requerido"
    }),
    cliente: z.number({
        required_error: "cliente es requerido"
    }),
    producto: z.number({
        required_error: "producto es requerido"
    }),
    nombre_producto: z.string({
        required_error: "nombre_producto es requerido"
    }),
    precio_compra: z.number({
        required_error: "Precio_compra es requerido"
    }),
    precio_venta: z.number({
        required_error: "Precio_venta es requerido"
    }),
    date: z.string().datetime().optional(),
})