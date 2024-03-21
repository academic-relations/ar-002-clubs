import z from "zod";

export type IUrl = string | ((...params: string[]) => string);
export type IMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface IApiObject<A extends IUrl, B extends IMethod> {
  url: A;
  method: B;
  requestParam: z.AnyZodObject;
  requestQuery: z.AnyZodObject;
  requestBody: z.AnyZodObject;
  responseBodyMap: Record<number, z.AnyZodObject>;
  responseErrorMap: Record<number, z.AnyZodObject>;
}
