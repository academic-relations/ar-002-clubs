import { z } from "zod";

export const zFile = z.object({
  id: z.string().max(128).min(1),
  name: z.string(),
  extension: z.string(),
  size: z.number(),
  url: z.string(),
  userId: z.coerce.number().min(1),
});

export const zFileSummary = z.object({
  id: z.string().max(128).min(1),
  name: z.string(),
  url: z.string(),
});

export type IFile = z.infer<typeof zFile>;
export type IFileSummary = z.infer<typeof zFileSummary>;
