import { z } from "zod";

export const PersonalInfoSchema = z.object({
  fullName: z
    .string()
    .min(3, "El nombre completo debe ser válido.")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "El nombre solo puede incluir letras y espacios."),
  email: z
    .string()
    .email("El correo electrónico debe ser válido.")
    .min(1, "El correo electrónico es requerido."),
  phone: z
    .string()
    .regex(
      /^[\+\-\.\s\(\)0-9\u00C0-\u017F]*$/,
      "El número de teléfono debe ser válido."
    )
    .min(1, "El número de teléfono es requerido."),
  location: z
    .string()
    .regex(
      /^[\wÀ-ÿ\s,.'-]+$/,
      "La ubicación solo puede contener letras y caracteres comunes."
    )
    .min(1, "La ubicación es requerida."),
  portfolioUrl: z
    .string()
    .url("El URL debe ser válido.")
    .or(z.literal("")),
});
