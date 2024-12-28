import { z } from "zod";

export const ExperienceSchema = z.object({
    currentRole: z.string().min(1, "El rol actual es requerido"),
    yearsOfExperience: z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val) && val >= 0, {
            message: "Los años de experiencia deben ser un número positivo",
        }),
    skills: z
        .array(z.string())
        .min(3, { message: "Debe tener al menos 3 habilidades" }),
    company: z.string().min(1, "La empresa es requerida"),
    achievementsDescription: z.string().min(100, "La descripción de logros debe tener al menos 100 caracteres"),
});

export type Experience = z.infer<typeof ExperienceSchema>;
