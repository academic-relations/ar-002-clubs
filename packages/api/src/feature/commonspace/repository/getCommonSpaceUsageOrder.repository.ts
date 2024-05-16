import { Inject, Injectable } from "@nestjs/common";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { MySql2Database } from "drizzle-orm/mysql2";
import { CommonSpaceUsageOrderD } from "@sparcs-clubs/api/drizzle/schema/common-space.schema";
import { Student, User } from "@sparcs-clubs/api/drizzle/schema/user.schema";
import { and, eq, gte, lte, sql } from "drizzle-orm";
import { ApiCms002ResponseOK } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";

@Injectable()
export class GetCommonSpaceUsageOrderRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findBySpaceIdAndStartTermBetweenAndEndTermBetween(
    spaceId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<ApiCms002ResponseOK> {
    const result = await this.db
      .select({
        orderId: CommonSpaceUsageOrderD.id,
        clubId: CommonSpaceUsageOrderD.clubId,
        chargeStudentName: sql<string>`CONCAT(SUBSTRING(User.name, 1, 1), '*', SUBSTRING(User.name, 3))`,
        startTerm: CommonSpaceUsageOrderD.startTerm,
        endTerm: CommonSpaceUsageOrderD.endTerm,
      })
      .from(CommonSpaceUsageOrderD)
      .leftJoin(Student, eq(CommonSpaceUsageOrderD.chargeStudentId, Student.id))
      .leftJoin(User, eq(Student.userId, User.id))
      .where(
        and(
          eq(CommonSpaceUsageOrderD.commonSpaceId, spaceId),
          gte(CommonSpaceUsageOrderD.startTerm, startDate),
          lte(CommonSpaceUsageOrderD.endTerm, endDate),
        ),
      );
    return { usageOrders: result };
  }
}
