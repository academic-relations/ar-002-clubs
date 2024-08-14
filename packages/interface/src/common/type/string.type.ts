import { z } from "zod";

const zRequiredString = z.preprocess(
  val => (val === undefined || val === null ? "" : val.toString()),
  z.string().min(1),
);

type RequiredString = z.infer<typeof zRequiredString>;

export { zRequiredString };
export type { RequiredString };
