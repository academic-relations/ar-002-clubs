import { z } from "zod";

export const zActivityDuration = z.object({
  id: z.coerce.number().int().min(1),
  year: z.coerce.number().int().min(1),
  name: z.string().max(10).min(1),
  startTerm: z.date(),
  endTerm: z.date(),
  createdAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type IActivityDuration = z.infer<typeof zActivityDuration>;
