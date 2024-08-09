import { HttpException, Inject, Injectable } from "@nestjs/common";
import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import { ApiReg010ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg010";
import { ApiReg012ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg012";
import { RegistrationEventEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import {
  and,
  count,
  eq,
  gt,
  inArray,
  isNotNull,
  isNull,
  lte,
} from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
import { getKSTDate, takeUnique } from "@sparcs-clubs/api/common/util/util";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import {
  Registration,
  RegistrationDeadlineD,
} from "@sparcs-clubs/api/drizzle/schema/registration.schema";

@Injectable()
export class ClubRegistrationRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findByClubId(clubId: number) {
    const clubs = await this.db
      .select()
      .from(Registration)
      .where(
        and(eq(Registration.clubId, clubId), isNull(Registration.deletedAt)),
      );

    return clubs;
  }

  async createRegistration(body: ApiReg001RequestBody) {
    await this.db.transaction(async tx => {
      const [registrationInsertResult] = await tx.insert(Registration).values({
        clubId: body.clubId,
        registrationApplicationTypeEnumId: body.registrationTypeEnumId,
        clubNameKr: body.krName,
        clubNameEn: body.enName,
        studentId: body.studentId,
        studentPhoneNumber: body.phoneNumber,
        foundedAt: body.foundedAt,
        divisionId: body.divisionId,
        activityFieldKr: body.kr활동분야,
        activityFieldEn: body.en활동분야,
        professorId: body.professor?.ProfessorEnumId,
        divisionConsistency: body.divisionIntegrity,
        foundationPurpose: body.foundationPurpose,
        activityPlan: body.activityPlan,
        // clubRuleFileId: body.clubRuleFileId,
        // externalInstructionFileId: body.externalInstructionFileId,
        // activityId: body.activityId,
        registrationApplicationStatusEnumId: 1, // Example status ID
      });

      if (registrationInsertResult.affectedRows !== 1) {
        logger.debug("[createRegistration] rollback occurs");
        tx.rollback();
      }

      logger.debug(
        `[createRegistration] Registration inserted with id ${registrationInsertResult.insertId}`,
      );
    });

    logger.debug("[createRegistration] insertion ends successfully");
  }

  async isClubRegistrationEvent(): Promise<boolean> {
    const cur = getKSTDate();
    const clubRegistrationEventEnum = [
      RegistrationEventEnum.ClubRegistrationApplication,
      RegistrationEventEnum.ClubRegistrationModification,
    ];
    const { isAvailable } = await this.db
      .select({ isAvailable: count(RegistrationDeadlineD.id) })
      .from(RegistrationDeadlineD)
      .where(
        and(
          lte(RegistrationDeadlineD.startDate, cur),
          gt(RegistrationDeadlineD.endDate, cur),
          inArray(
            RegistrationDeadlineD.registrationDeadlineEnumId,
            clubRegistrationEventEnum,
          ),
        ),
      )
      .then(takeUnique);
    return isAvailable === 1;
  }

  async deleteStudentRegistrationsClubRegistration(
    studentId: number,
    applyId: number,
  ): Promise<ApiReg010ResponseOk> {
    const cur = getKSTDate();
    await this.db.transaction(async tx => {
      const [result] = await tx
        .update(Registration)
        .set({
          deletedAt: cur,
        })
        .where(
          and(
            eq(Registration.id, applyId),
            eq(Registration.studentId, studentId),
            isNotNull(Registration.deletedAt),
          ),
        );
      if (result.affectedRows !== 1) {
        await tx.rollback();
        throw new HttpException("Registration delete failed", 500);
      }
    });
    return {};
  }

  async getStudentRegistrationsClubRegistrationsMy(
    studentId: number,
  ): Promise<ApiReg012ResponseOk> {
    const result = await this.db
      .select({
        id: Registration.id,
        registrationTypeEnumId: Registration.registrationApplicationTypeEnumId,
        registrationStatusEnumId:
          Registration.registrationApplicationStatusEnumId,
        krName: Registration.clubNameKr,
        enName: Registration.clubNameEn,
      })
      .from(Registration)
      .where(and(eq(Registration.studentId, studentId)));
    return { registrations: result };
  }
}
