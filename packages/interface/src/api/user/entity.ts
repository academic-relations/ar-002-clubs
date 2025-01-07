import { z } from "zod";

export const zStudent = z.object({
  id: z.number(),
  userId: z.number(),
  studentNumber: z.coerce.number(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
});

export type TStudent = z.infer<typeof zStudent>; // zod에서 바로 Interface를 생성할 수 없음

export interface IStudent extends TStudent {} // type으로 Interface를 생성
