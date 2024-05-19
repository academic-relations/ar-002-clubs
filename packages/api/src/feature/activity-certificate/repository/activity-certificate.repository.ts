import { Injectable, Inject } from "@nestjs/common";
import { StudentT } from "src/drizzle/schema/user.schema";
import { MySql2Database } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { ActivityCertificate } from "src/drizzle/schema/activity-certificate.schema";

@Injectable()
export class ActivityCertificateRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async postActivityCertificate({
    clubId,
    studentNumber,
    studentPhoneNumber,
    issuedNumber,
  }: {
    clubId: number;
    studentNumber: number;
    studentPhoneNumber: string;
    issuedNumber: number;
  }) {
    const students = await this.db
      .select()
      .from(StudentT)
      .where(eq(StudentT.number, studentNumber));
    const student = students[0];

    const { studentId } = student;

    const result = await this.db.insert(ActivityCertificate).values({
      clubId,
      studentId,
      studentPhoneNumber,
      issueNumber: issuedNumber,
      activityCertificateStatusEnum: 1,
    });
    return result[0].insertId;
  }
}
