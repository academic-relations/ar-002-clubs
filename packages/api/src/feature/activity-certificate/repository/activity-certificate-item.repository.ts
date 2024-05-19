import { Inject, Injectable } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { ActivityCertificateItem } from "src/drizzle/schema/activity-certificate.schema";

@Injectable()
export class ActivityCertificateItemRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async postActivityCertificate({
    activityCertificateId,
    items,
  }: {
    activityCertificateId: number;
    items: { startMonth: Date; endMonth: Date; detail: string }[];
  }) {
    items.forEach(item => {
      this.db.insert(ActivityCertificateItem).values({
        activityCertificateId,
        order: items.indexOf(item),
        startMonth: item.startMonth,
        endMonth: item.endMonth,
        detail: item.detail,
      });
    });
  }
}
