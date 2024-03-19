import z from "zod";

// Example Common DTOs

export const PaginationRequest = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
});

export const PaginationResponse = z.object({
  page: z.number().int().positive(),
  total: z.number().int().positive(),
  limit: z.number().int().positive(),
});

export const createErrorResponse = (type: string, message: string) =>
  z.object({
    status: z.literal("error"),
    type: z.literal(type),
    message: z.literal(message),
  });
