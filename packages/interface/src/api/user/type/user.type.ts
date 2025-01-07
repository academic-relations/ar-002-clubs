import { z } from "zod";

export const zStudent = z.object({
  id: z.number(),
  userId: z.number(),
  studentNumber: z.string(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
});

export const zStudentSummary = z.object({
  id: z.coerce.number().int().min(1),
  name: z.string().optional(),
  studentNumber: z.string().optional(),
});

export type IStudent = z.infer<typeof zStudent>;
