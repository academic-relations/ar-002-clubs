import { migrate } from "drizzle-orm/mysql2/migrator";

import logger from "../common/util/logger";

import { getConnection, getDbInstance } from "./drizzle.provider";

async function runMigrations() {
  try {
    const db = await getDbInstance();
    logger.debug(process.cwd());
    await migrate(db, { migrationsFolder: "./src/drizzle/migration" });

    const connection = await getConnection();
    await connection.end();
  } catch (error) {
    logger.debug("Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();
