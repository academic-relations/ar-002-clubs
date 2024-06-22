import { Inject, Injectable } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
  ActivityCertificate,
  ActivityCertificateItem,
} from "src/drizzle/schema/activity-certificate.schema";

@Injectable()
export class ActivityCertificateRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

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
