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
  agencia: z.string({
    required_error: "La agencia es requerida",
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
