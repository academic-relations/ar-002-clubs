import { Inject, Injectable } from "@nestjs/common";
import { ApiReg004ResponseOK } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";
import { and, count, desc, gt, isNull, lte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { takeUnique } from "@sparcs-clubs/api/common/util/util";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
  RegistrationDeadlineD,
  RegistrationDeadlineEnum,
} from "src/drizzle/schema/registration.schema";

@Injectable()
export class RegistrationRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async getStudentRegistrationEvents(): Promise<ApiReg004ResponseOK> {
    const { eventEnumCount } = await this.db
      .select({ eventEnumCount: count(RegistrationDeadlineEnum.enumId) })
      .from(RegistrationDeadlineEnum)
      .where(isNull(RegistrationDeadlineEnum.deletedAt))
      .then(takeUnique);
    const result = await this.db
      .select({
        id: RegistrationDeadlineD.id,
        registrationEventEnumId:
          RegistrationDeadlineD.registrationDeadlineEnumId,
        startTerm: RegistrationDeadlineD.startDate,
        endTerm: RegistrationDeadlineD.endDate,
      })
      .from(RegistrationDeadlineD)
      .orderBy(desc(RegistrationDeadlineD.startDate))
      .limit(eventEnumCount);
    return { events: result };
  }

  async selectDeadlineByDate(date: Date) {
    const result = await this.db
      .select()
      .from(RegistrationDeadlineD)
      .where(
        and(
          lte(RegistrationDeadlineD.startDate, date),
          gt(RegistrationDeadlineD.endDate, date),
          isNull(RegistrationDeadlineD.deletedAt),
        ),
      );
    return result;
  }
}
