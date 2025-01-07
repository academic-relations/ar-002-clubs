import { z } from "zod";

export const zFile = z.object({
  id: z.string(),
  name: z.string().max(255),
  extension: z.string(),
  size: z.number(),
  url: z.string(),
  userId: z.number(),
});

export type TFile = z.infer<typeof zFile>; // zod에서 바로 Interface를 생성할 수 없음

export interface IFile extends TFile {} // type으로 Interface를 생성
