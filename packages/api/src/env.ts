import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  SERVER_PORT: z.coerce.number(),
  SECRET_KEY: z.string(),
  DATABASE_URL: z.string(),
});

const env = schema.parse(process.env);

const getJwtConfig = () => ({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: process.env.EXPIRES_IN,
    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSsoConfig = (): any => ({
  ssoIsBeta: process.env.SSO_IS_BETA !== "false",
  ssoClientId: process.env.SSO_CLIENT_ID,
  ssoSecretKey: process.env.SSO_SECRET_KEY,
});

export { env, getJwtConfig, getSsoConfig };
