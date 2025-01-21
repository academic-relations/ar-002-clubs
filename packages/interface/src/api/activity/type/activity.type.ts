import { z } from "zod";

// TODO: 수정 필요
export const zActivity = z.object({
  id: z.coerce.number().int().min(1),
  clubId: z.coerce.number().int().min(1),
  name: z.string().max(255).min(1),
});

// TODO: 수정 필요
export const zActivitySummary = zActivity.pick({
  id: true,
  name: true,
});

export type IActivitySummary = z.infer<typeof zActivitySummary>;
