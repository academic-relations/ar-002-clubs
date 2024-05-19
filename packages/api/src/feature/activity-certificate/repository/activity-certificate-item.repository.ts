import { Inject, Injectable } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { ActivityCertificateItem } from "src/drizzle/schema/activity-certificate.schema";
import "regenerator-runtime/runtime"; // Import the regenerator-runtime package

@Injectable()
export class ActivityCertificateItemRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async create({
    items,
  }: {
    items: { startMonth: Date; endMonth: Date; detail: string }[];
  }) {
    items.forEach(item => {
      this.db.insert(ActivityCertificateItem).values({
        activityCertificateId: 1, // TODO: 올바른 값으로 바꾸기
        order: 1, // TODO: order가 뭔지 확인하고 올바른 값으로 바꾸기
        startMonth: item.startMonth,
        endMonth: item.endMonth,
        detail: item.detail,
      });
    });
  }
}
