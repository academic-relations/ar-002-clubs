import { z } from "zod";

export const zFile = z.object({
  id: z.string().max(128).min(1),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  url: z.string(),
});

export const zFileSummary = z.object({
  id: z.string().max(128).min(1),
  name: z.string().optional(),
  url: z.string().optional(),
});
