import {
  // HttpException, HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";

// import { and, count, eq, gte, isNull, lt, max, not, sql } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

// import logger from "@sparcs-clubs/api/common/util/logger";
// import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

@Injectable()
export class EntityRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}
}
