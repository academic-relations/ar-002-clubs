import { datetime, index, int, mysqlTable, text } from "drizzle-orm/mysql-core";

import { User } from "./user.schema";

export const AuthActivatedRefreshTokens = mysqlTable(
  "auth_activated_refresh_tokens",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id")
      .notNull()
      .references(() => User.id),
    expiresAt: datetime("expires_at").notNull(),
    refreshToken: text("refresh_token").notNull(), // todo: refresh token 길이에 따라 varchar로 변경 하는 것을 고려.
  },
  table => ({
    expiresAtIdx: index("expires_at_idx").on(table.expiresAt),
  }),
);
