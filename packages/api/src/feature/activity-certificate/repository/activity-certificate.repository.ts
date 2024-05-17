import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { ActivityCertificate } from "src/drizzle/schema/activity-certificate.schema";

@Injectable()
export class ActivityCertificateRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async create({
    clubId,
    studentId,
    studentPhoneNumber,
    issuedNumber,
  }: {
    clubId: number;
    studentId: number;
    studentPhoneNumber: string;
    issuedNumber: number;
  }) {
    await this.db.insert(ActivityCertificate).values({
      clubId,
      studentId,
      studentPhoneNumber,
      issueNumber: issuedNumber,
      activityCertificateStatusEnum: 1,
    });
  }
}
