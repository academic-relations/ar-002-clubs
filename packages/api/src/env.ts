// import type { Config } from "drizzle-kit";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  SERVER_PORT: z.coerce.number(),
  SECRET_KEY: z.string(),
  DATABASE_URL: z.string(),
});

const env = schema.parse(process.env);

// const drizzleConfig: Config = {
//   driver: "mysql2",
//   out: "./src/drizzle",
//   schema: "./src/drizzle/schema",
//   dbCredentials: {
//     uri: env.DATABASE_URL,
//   },
//   verbose: true,
//   strict: false,
// };

export { env };
