import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  SERVER_PORT: z.coerce.number(),
  SECRET_KEY: z.string(),
  DATABASE_URL: z.string(),
});

const env = schema.parse(process.env);

export { env };
