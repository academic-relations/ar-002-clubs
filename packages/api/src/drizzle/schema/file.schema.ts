import {
  datetime,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from "uuid";

import { User } from "./user.schema";

function createId(): string {
  return uuidv4();
}

export const File = mysqlTable("file", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  extension: varchar("extension", { length: 30 }).notNull(),
  size: int("size").notNull(),
  userId: int("user_id")
    .notNull()
    .references(() => User.id),
  signedAt: datetime("signed_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
