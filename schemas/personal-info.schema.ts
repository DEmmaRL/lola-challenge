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
      /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, /* Getting from https://regex101.com/r/j48BZs/2 */
      "El número de teléfono debe ser válido."
    )
    .min(1, "El número de teléfono es requerido."),
  location: z
    .string()
    .regex(
      /^[\wÀ-ÿ\s,.'-]+$/, 
      "La locación solo puede contener letras y caracteres comunes."
    )
    .min(1, "La locación es requerida."),
  portfolioUrl: z
    .string()
    .url("La URL debe ser válida.")
    .or(z.literal("")),
});
