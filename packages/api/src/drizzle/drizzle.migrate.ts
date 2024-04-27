import { migrate } from "drizzle-orm/mysql2/migrator";
import { getConnection, getDbInstance } from "./drizzle.provider";

async function runMigrations() {
  try {
    const db = await getDbInstance();
    console.log(process.cwd());
    await migrate(db, { migrationsFolder: "./src/drizzle/migration" });

    const connection = await getConnection();
    await connection.end();
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();
