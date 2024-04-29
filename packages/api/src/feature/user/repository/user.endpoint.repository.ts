import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

@Injectable()
export class UserEndpointRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}
}
