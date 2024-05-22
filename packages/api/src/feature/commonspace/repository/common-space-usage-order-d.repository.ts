import { Inject, Injectable } from "@nestjs/common";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { MySql2Database } from "drizzle-orm/mysql2";
import { CommonSpaceUsageOrderD } from "@sparcs-clubs/api/drizzle/schema/common-space.schema";
import { ApiCms003ResponseCreated } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms003";
import { and, between, eq, or, isNull, sql } from "drizzle-orm";
import { takeUnique } from "@sparcs-clubs/api/common/util/util";

@Injectable()
export class CommonSpaceUsageOrderDRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async setCommonSpaceUsageOrderD(
    commonSpaceId: number,
    clubId: number,
    chargeStudentId: number,
    studentPhoneNumber: string,
    startTerm: Date,
    endTerm: Date,
  ): Promise<ApiCms003ResponseCreated> {
    await this.db.insert(CommonSpaceUsageOrderD).values({
      commonSpaceId,
      clubId,
      chargeStudentId,
      studentPhoneNumber,
      startTerm,
      endTerm,
    });
    return {};
  }

  async findBySpaceIdAndClubIdAndStartTermBetweenAndEndTermBetween(
    spaceId: number,
    clubId: number,
    startDate: Date,
    endDate: Date,
  ) {
    const result = await this.db
      .select({
        start: CommonSpaceUsageOrderD.startTerm,
        end: CommonSpaceUsageOrderD.endTerm,
      })
      .from(CommonSpaceUsageOrderD)
      .where(
        and(
          eq(CommonSpaceUsageOrderD.commonSpaceId, spaceId),
          eq(CommonSpaceUsageOrderD.clubId, clubId),
          or(
            between(CommonSpaceUsageOrderD.startTerm, startDate, endDate),
            between(CommonSpaceUsageOrderD.endTerm, startDate, endDate),
          ),
          isNull(CommonSpaceUsageOrderD.deletedAt),
        ),
      );
    return result;
  }

  async findCommonSpaceUsageOrderByIdAndSpaceId(
    orderId: number,
    spaceId: number,
  ) {
    const result = await this.db
      .select()
      .from(CommonSpaceUsageOrderD)
      .where(
        and(
          eq(CommonSpaceUsageOrderD.id, orderId),
          eq(CommonSpaceUsageOrderD.commonSpaceId, spaceId),
          isNull(CommonSpaceUsageOrderD.deletedAt),
        ),
      )
      .then(takeUnique);
    return result;
  }

  async deleteCommonSpaceUsageOrderD(orderId: number) {
    const result = await this.db
      .update(CommonSpaceUsageOrderD)
      .set({ deletedAt: sql<Date>`NOW()` })
      .where(eq(CommonSpaceUsageOrderD.id, orderId));
    return result;
  }
}
