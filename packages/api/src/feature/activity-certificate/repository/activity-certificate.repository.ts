import { Inject, Injectable } from "@nestjs/common";
import { and, count, desc, eq, gte, lte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
  ActivityCertificate,
  ActivityCertificateItem,
} from "src/drizzle/schema/activity-certificate.schema";

import type { ApiAcf003RequestQuery } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf003";

@Injectable()
export class ActivityCertificateRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async countActivityCertificatesByClubIdAndCreatedAtIn(
    clubId: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<number> {
    const numberOfOrders = (
      await this.db
        .select({ count: count() })
        .from(ActivityCertificate)
        .where(
          and(
            eq(ActivityCertificate.clubId, clubId),
            startDate !== undefined
              ? gte(ActivityCertificate.createdAt, startDate)
              : undefined,
            endDate !== undefined
              ? lte(ActivityCertificate.createdAt, endDate)
              : undefined,
          ),
        )
    ).at(0).count;

    return numberOfOrders;
  }

  async findActivityCertificatesPageByClubIdAndCreatedAtIn(
    query: ApiAcf003RequestQuery,
  ) {
    const startIndex = (query.pageOffset - 1) * query.itemCount + 1;

    const orders = await this.db
      .select()
      .from(ActivityCertificate)
      .where(
        and(
          eq(ActivityCertificate.clubId, query.clubId),
          query.startDate !== undefined
            ? gte(ActivityCertificate.createdAt, query.startDate)
            : undefined,
          query.endDate !== undefined
            ? lte(ActivityCertificate.createdAt, query.endDate)
            : undefined,
        ),
      )
      .orderBy(desc(ActivityCertificate.createdAt))
      .limit(query.itemCount)
      .offset(startIndex - 1);

    return orders;
  }

  async postActivityCertificate({
    clubId,
    studentId,
    studentPhoneNumber,
    issuedNumber,
    items,
  }: {
    clubId: number;
    studentId: number;
    studentPhoneNumber: string;
    issuedNumber: number;
    items: { startMonth: Date; endMonth: Date; detail: string }[];
  }) {
    // TODO: transaction 실패했을 때 에러핸들링
    await this.db.transaction(async tx => {
      const result = await tx.insert(ActivityCertificate).values({
        clubId,
        studentId,
        studentPhoneNumber,
        issueNumber: issuedNumber,
        activityCertificateStatusEnum: 1,
      });

      items.forEach(async item => {
        await tx.insert(ActivityCertificateItem).values({
          activityCertificateId: result[0].insertId,
          order: items.indexOf(item),
          startMonth: item.startMonth,
          endMonth: item.endMonth,
          detail: item.detail,
        });
      });
    });
  }
}
