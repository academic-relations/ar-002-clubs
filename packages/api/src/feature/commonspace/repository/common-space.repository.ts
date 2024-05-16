import { Inject, Injectable } from "@nestjs/common";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { CommonSpace } from "@sparcs-clubs/api/drizzle/schema/commonspace.schema";
import { MySql2Database } from "drizzle-orm/mysql2";

@Injectable()
export class CommonSpaceRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async getAllCommonSpaces() {
    const result = await this.db
      .select({
        id: CommonSpace.id,
        commonSpaceEnum: CommonSpace.commonSpaceEnum,
        name: CommonSpace.spaceName,
        availableHoursPerWeek: CommonSpace.availableHoursPerWeek,
        availableHoursPerDay: CommonSpace.availableHoursPerDay,
      })
      .from(CommonSpace);
    return result;
  }
}
