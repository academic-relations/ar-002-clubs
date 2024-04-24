import "dotenv/config"; // make sure to install dotenv package
import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";
import path from "path";

// 환경 변수 파일의 경로를 명시적으로 설정
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export default {
  driver: "mysql2",
  out: "./src/drizzle",
  schema: "./src/drizzle/schema",
  dbCredentials: {
    uri: process.env.DATABASE_URL,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: false,
} satisfies Config;
