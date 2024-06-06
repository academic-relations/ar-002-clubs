// dizzle.provider.ts

import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

import { env } from "../env";
import * as commonSpaceSchema from "./schema/common-space.schema";
import * as divisionSchema from "./schema/division.schema";
import * as noticeSchema from "./schema/notice.schema";
import * as promotionalPrintingSchema from "./schema/promotional-printing.schema";
import * as rentalSchema from "./schema/rental.schema";
import * as userSchema from "./schema/user.schema";

export const DrizzleAsyncProvider = "drizzleProvider";

let dbInstance = null;
let connectionInstance = null;

const createConnection = async () => {
  const connection = await mysql.createConnection({
    uri: env.DATABASE_URL,
  });

  connection.on("error", async err => {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed. Reconnecting...");
      connectionInstance = await createConnection();
    } else {
      throw err;
    }
  });

  return connection;
};

export const getConnection = async () => {
  if (!connectionInstance) {
    connectionInstance = await createConnection();
  } else {
    try {
      await connectionInstance.ping();
    } catch (error) {
      console.error("Connection ping failed, reconnecting...", error);
      connectionInstance = await createConnection();
    }
  }
  return connectionInstance;
};

export const getDbInstance = async () => {
  if (!dbInstance) {
    const connection = await getConnection();
    dbInstance = drizzle(connection, {
      schema: {
        commonSpaceSchema,
        divisionSchema,
        noticeSchema,
        promotionalPrintingSchema,
        rentalSchema,
        userSchema,
      },
      mode: "default",
    });
  }
  return dbInstance;
};

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: getDbInstance,
    exports: [DrizzleAsyncProvider],
  },
];
