import { ZodObject, ZodRawShape } from "zod";

// pickElement 함수 정의
export const zPickElement = <T extends ZodRawShape, K extends keyof T>(
  schema: ZodObject<T>,
  key: K,
): T[K] => {
  const pickedSchema = schema.pick({ key: true } as Record<keyof T, true>);
  return pickedSchema.shape[key];
};
