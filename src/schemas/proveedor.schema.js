import { z } from "zod";

export const ProveedorSchema = z.object({
  code: z.string({
    required_error: "Code is required",
  }),

  nit: z.number({
    required_error: "Nit is required",
  }),

  nombre: z.string({
    required_error: "Nombre is required",
  }),

  empresa: z.string({
    required_error: "Empresa is required",
  }),

  email: z.string({
    required_error: "Email is required",
  }),

  direccion: z.string({
    required_error: "Direccion is required",
  }),
  telefono: z.number({
    required_error: "Telefono is required",
  }),

  date: z.string().datetime().optional(),
});
