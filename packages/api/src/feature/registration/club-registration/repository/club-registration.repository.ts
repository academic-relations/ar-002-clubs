import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import {
  ApiReg009RequestBody,
  ApiReg009ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg009";
import { ApiReg010ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg010";
import { ApiReg011ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg011";
import { ApiReg012ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg012";
import {
  RegistrationEventEnum,
  RegistrationStatusEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";
import { and, count, eq, gt, inArray, isNull, lte, or } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
import { getKSTDate, takeUnique } from "@sparcs-clubs/api/common/util/util";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { File } from "@sparcs-clubs/api/drizzle/schema/file.schema";
import {
  Registration,
  RegistrationDeadlineD,
} from "@sparcs-clubs/api/drizzle/schema/registration.schema";
import {
  Professor,
  ProfessorT,
} from "@sparcs-clubs/api/drizzle/schema/user.schema";

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

  async createRegistration(
    body: ApiReg001RequestBody,
  ): Promise<ApiReg001ResponseCreated> {
    const cur = getKSTDate();
    await this.db.transaction(async tx => {
      let professorId;
      if (body.professor) {
        professorId = await tx
          .select({
            professorId: Professor.id,
          })
          .from(Professor)
          .leftJoin(
            ProfessorT,
            and(
              eq(Professor.id, ProfessorT.professorId),
              eq(ProfessorT.professorEnum, body.professor.professorEnumId),
              isNull(ProfessorT.deletedAt),
              lte(ProfessorT.startTerm, cur),
              or(isNull(ProfessorT.endTerm), gt(ProfessorT.endTerm, cur)),
            ),
          )
          .where(
            and(
              eq(Professor.email, body.professor.email),
              eq(Professor.name, body.professor.name),
              isNull(Professor.deletedAt),
            ),
          )
          .for("share")
          .then(takeUnique);
        if (!professorId)
          throw new HttpException(
            "Professor Not Found",
            HttpStatus.BAD_REQUEST,
          );
      }

      const [registrationInsertResult] = await tx.insert(Registration).values({
        clubId: body.clubId,
        registrationApplicationTypeEnumId: body.registrationTypeEnum,
        clubNameKr: body.clubNameKr,
        clubNameEn: body.clubNameEn,
        studentId: body.studentId,
        phoneNumber: body.phoneNumber,
        foundedAt: body.foundedAt,
        divisionId: body.divisionId,
        activityFieldKr: body.activityFieldKr,
        activityFieldEn: body.activityFieldEn,
        professorId,
        divisionConsistency: body.divisionConsistency,
        foundationPurpose: body.foundationPurpose,
        activityPlan: body.activityPlan,
        registrationActivityPlanFileId: body.activityPlanFileId,
        registrationClubRuleFileId: body.clubRuleFileId,
        registrationExternalInstructionFileId: body.externalInstructionFileId,
        registrationApplicationStatusEnumId: RegistrationStatusEnum.Pending,
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
    return {};
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

  async putStudentRegistrationsClubRegistration(
    studentId: number,
    applyId: number,
    body: ApiReg009RequestBody,
  ): Promise<ApiReg009ResponseOk> {
    const cur = getKSTDate();
    await this.db.transaction(async tx => {
      const registration = await tx
        .select()
        .from(Registration)
        .where(
          and(
            eq(Registration.id, applyId),
            body.clubId === undefined
              ? undefined
              : eq(Registration.clubId, body.clubId),
            eq(
              Registration.registrationApplicationTypeEnumId,
              body.registrationTypeEnum,
            ),
            eq(Registration.studentId, studentId),
            isNull(Registration.deletedAt),
          ),
        )
        .for("update")
        .then(takeUnique);
      if (!registration)
        throw new HttpException(
          "No registration found",
          HttpStatus.BAD_REQUEST,
        );
      let professorId;
      if (body.professor) {
        professorId = await tx
          .select({
            professorId: Professor.id,
          })
          .from(Professor)
          .leftJoin(
            ProfessorT,
            and(
              eq(Professor.id, ProfessorT.professorId),
              eq(ProfessorT.professorEnum, body.professor.professorEnumId),
              isNull(ProfessorT.deletedAt),
              lte(ProfessorT.startTerm, cur),
              or(isNull(ProfessorT.endTerm), gt(ProfessorT.endTerm, cur)),
            ),
          )
          .where(
            and(
              eq(Professor.email, body.professor.email),
              eq(Professor.name, body.professor.name),
              isNull(Professor.deletedAt),
            ),
          )
          .for("share")
          .then(takeUnique);
        if (!professorId)
          throw new HttpException(
            "Professor Not Found",
            HttpStatus.BAD_REQUEST,
          );
      }
      const [result] = await tx
        .update(Registration)
        .set({
          clubNameKr: body.clubNameKr,
          clubNameEn: body.clubNameEn,
          phoneNumber: body.phoneNumber,
          foundedAt: body.foundedAt,
          divisionId: body.divisionId,
          activityFieldKr: body.activityFieldKr,
          activityFieldEn: body.activityFieldEn,
          professorId,
          divisionConsistency: body.divisionConsistency,
          foundationPurpose: body.foundationPurpose,
          activityPlan: body.activityPlan,
          registrationActivityPlanFileId: body.activityPlanFileId,
          registrationClubRuleFileId: body.clubRuleFileId,
          registrationExternalInstructionFileId: body.externalInstructionFileId,
          updatedAt: cur,
        })
        .where(
          and(
            eq(Registration.id, applyId),
            eq(Registration.studentId, studentId),
            isNull(Registration.deletedAt),
          ),
        );
      if (result.affectedRows !== 1) {
        await tx.rollback();
        throw new HttpException("Registration update failed", 500);
      }
    });
    return {};
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
            isNull(Registration.deletedAt),
          ),
        );
      if (result.affectedRows !== 1) {
        await tx.rollback();
        throw new HttpException("Registration delete failed", 500);
      }
    });
    return {};
  }

  async getStudentRegistrationsClubRegistration(
    studentId: number,
    applyId: number,
  ): Promise<ApiReg011ResponseOk> {
    const cur = getKSTDate();
    const result = await this.db.transaction(async tx => {
      const File1 = alias(File, "File1");
      const File2 = alias(File, "File2");
      const File3 = alias(File, "File3");
      const registration = await tx
        .select({
          id: Registration.id,
          registrationTypeEnum: Registration.registrationApplicationTypeEnumId,
          registrationStatusEnum:
            Registration.registrationApplicationStatusEnumId,
          clubId: Registration.clubId,
          clubNameKr: Registration.clubNameKr,
          clubNameEn: Registration.clubNameEn,
          studentId: Registration.studentId,
          phoneNumber: Registration.phoneNumber,
          foundedAt: Registration.foundedAt,
          divisionId: Registration.divisionId,
          activityFieldKr: Registration.activityFieldKr,
          activityFieldEn: Registration.activityFieldEn,
          professor: Registration.professorId,
          divisionConsistency: Registration.divisionConsistency,
          foundationPurpose: Registration.foundationPurpose,
          activityPlan: Registration.activityPlan,
          activityPlanFileId: Registration.registrationActivityPlanFileId,
          activityPlanFileName: File1.name,
          clubRuleFileId: Registration.registrationClubRuleFileId,
          clubRuleFileName: File2.name,
          externalInstructionFileId:
            Registration.registrationExternalInstructionFileId,
          externalInstructionFileName: File3.name,
        })
        .from(Registration)
        .leftJoin(
          File1,
          and(
            eq(Registration.registrationActivityPlanFileId, File1.id),
            isNull(File1.deletedAt),
          ),
        )
        .leftJoin(
          File2,
          and(
            eq(Registration.registrationClubRuleFileId, File2.id),
            isNull(File2.deletedAt),
          ),
        )
        .leftJoin(
          File3,
          and(
            eq(Registration.registrationExternalInstructionFileId, File3.id),
            isNull(File3.deletedAt),
          ),
        )
        .where(
          and(
            eq(Registration.studentId, studentId),
            eq(Registration.id, applyId),
            isNull(Registration.deletedAt),
          ),
        )
        .for("update")
        .then(takeUnique);
      if (!registration) {
        throw new HttpException(
          "Registration student or applyId not found",
          HttpStatus.BAD_REQUEST,
        );
      }
      if (registration.professor) {
        const professorDetail = await tx
          .select({
            name: Professor.name,
            email: Professor.email,
            professorEnumId: ProfessorT.professorEnum,
          })
          .from(Professor)
          .leftJoin(
            ProfessorT,
            and(
              eq(Professor.id, ProfessorT.professorId),
              isNull(ProfessorT.deletedAt),
              lte(ProfessorT.startTerm, cur),
              or(isNull(ProfessorT.endTerm), gt(ProfessorT.endTerm, cur)),
            ),
          )
          .where(
            and(
              eq(Professor.id, registration.professor),
              isNull(Professor.deletedAt),
            ),
          )
          .for("update")
          .then(takeUnique);
        const registrationDetail = {
          ...registration,
          professor: professorDetail,
        };
        return registrationDetail;
      }
      return { ...registration, professor: undefined };
    });
    return result;
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
      .where(
        and(
          eq(Registration.studentId, studentId),
          isNull(Registration.deletedAt),
        ),
      );
    return { registrations: result };
  }
}
