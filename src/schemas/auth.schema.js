import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "El username es requerido",
  }),
  email: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "El correo es invalido",
    }),
  password: z
    .string({
      required_error: "La contrasena es requerida",
    })
    .min(6, { message: "La contrasena debe ser minimo de 6 caracteres" }),
  rol: z.string({
    required_error: "El rol es requerido",
  }),
  telefono: z.string({
    required_error: "El telefono es requerido",
  }),
  placa: z.string({
    required_error: "La placa es requerida",
  }),
  nit: z.string({
    required_error: "El nit es requerido",
  }),
  aplicable_comision: z.boolean({
    required_error: "El aplicable es requerido",
  }),
  sueldo_base: z.number({
    required_error: "El sueldo es requerido",
  }),
  bono: z.boolean({
    required_error: "El bono es requerido",
  }),
  kilometraje: z.number({
    required_error: "El kilometraje es requerido",
  }),
  estado: z.boolean({
    required_error: "El estado es requerido",
  }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "El correo es invalido",
    }),
  password: z
    .string({
      required_error: "La contrasena es requerida",
    })
    .min(6, {
      message: "La contrasena debe ser minimo de 6 caracteres",
    }),
});
