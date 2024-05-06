import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

@Injectable()
export class NoticeRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}
}
