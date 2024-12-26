import { z } from "zod";

//todo: create ExperienceSchema
// json contract example bellow
// {
//   currentRole : string,
//   yearsOfExperience:number,
//   skills: string[],
//   company : string,
// }

export type Experience = z.infer<typeof ExperienceSchema>;
