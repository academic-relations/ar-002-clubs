import { z } from "zod";

export const zFile = z.object({
  id: z.string().length(128),
  name: z.string(),
  extension: z.string(),
  size: z.number(),
  url: z.string(),
  userId: z.coerce.number().min(1),
});

export const zFileSummary = zFile.pick({ id: true, name: true, url: true });

export type IFile = z.infer<typeof zFile>;
export type IFileSummary = z.infer<typeof zFileSummary>;
