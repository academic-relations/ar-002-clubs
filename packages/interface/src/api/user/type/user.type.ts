import { z } from "zod";

import { zStudentNumber } from "@sparcs-clubs/interface/common/type/user.type";

export const zStudent = z.object({
  id: z.number(),
  userId: z.number(),
  studentNumber: zStudentNumber,
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
});

export const zStudentSummary = z.object({
  id: z.coerce.number().int().min(1),
  name: z.string(),
  studentNumber: zStudentNumber,
});

export type IStudent = z.infer<typeof zStudent>;
export type IStudentSummary = z.infer<typeof zStudentSummary>;
