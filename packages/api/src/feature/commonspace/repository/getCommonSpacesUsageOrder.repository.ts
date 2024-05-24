import { Inject, Injectable } from "@nestjs/common";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import {
  CommonSpace,
  CommonSpaceUsageOrderD,
} from "@sparcs-clubs/api/drizzle/schema/common-space.schema";
import { Student } from "@sparcs-clubs/api/drizzle/schema/user.schema";
import { ApiCms006ResponseOk } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms006";
import { and, between, eq, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

@Injectable()
export class GetCommonSpacesUsageOrderRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async getStudentCommonSpacesUsageOrder(
    clubId: number,
    startDate: Date,
    endDate: Date,
    offset: number,
    total: number,
  ): Promise<ApiCms006ResponseOk> {
    const rows = await this.db
      .select({
        createdAt: CommonSpaceUsageOrderD.createdAt,
        orderId: CommonSpaceUsageOrderD.id,
        statusEnum: CommonSpace.commonSpaceEnum,
        spaceName: CommonSpace.spaceName,
        chargeStudentName: Student.name,
        startTerm: CommonSpaceUsageOrderD.startTerm,
        endTerm: CommonSpaceUsageOrderD.endTerm,
      })
      .from(CommonSpaceUsageOrderD)
      .leftJoin(
        CommonSpace,
        eq(CommonSpaceUsageOrderD.commonSpaceId, CommonSpace.id),
      )
      .leftJoin(Student, eq(CommonSpaceUsageOrderD.chargeStudentId, Student.id))
      .where(
        and(
          eq(CommonSpaceUsageOrderD.clubId, clubId),
          between(CommonSpaceUsageOrderD.startTerm, startDate, endDate),
          between(CommonSpaceUsageOrderD.endTerm, startDate, endDate),
          isNull(CommonSpaceUsageOrderD.deletedAt),
        ),
      );
    const result = {
      total,
      items: rows,
      offset,
    };
    return result;
  }
}
