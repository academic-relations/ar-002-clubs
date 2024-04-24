import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";

export const DrizzleAsyncProvider = "drizzleProvider";

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: async () => {
      const connection = await mysql.createConnection({
        uri: process.env.DATABASE_URL,
      });
      const db = drizzle(connection, { schema, mode: "default" });
      return db;
    },
    exports: [DrizzleAsyncProvider],
  },
];
