import { z } from "zod";

const zStudentNumber = z.string().min(6).max(8);

type StudentNumber = z.infer<typeof zStudentNumber>;

export { zStudentNumber };
export type { StudentNumber };
