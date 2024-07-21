// import { Inject, Injectable } from "@nestjs/common";
// import { RegistrationTypeEnum as Status } from "@sparcs-clubs/interface/common/enum/registration.enum";
// // import { and, count, desc, eq, gte, lte } from "drizzle-orm";
// import { MySql2Database } from "drizzle-orm/mysql2";

// import logger from "@sparcs-clubs/api/common/util/logger";
// import { Club } from "@sparcs-clubs/api/drizzle/schema/club.schema";
// import { Student } from "@sparcs-clubs/api/drizzle/schema/user.schema";
// import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
// import { Registration } from "src/drizzle/schema/registration.schema";

// import type {
//   PostStudentRegistrationParam,
//   PostStudentRegistrationReturn,
// } from "../dto/registration.dto";

// @Injectable()
// export class RegistrationRepository {
//   constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

//   async postRegistration(
//     parameter: PostStudentRegistrationParam,
//   ): Promise<PostStudentRegistrationReturn> {
//     await this.db.transaction(async tx => {
//       const [registrationInsertResult] = await tx.insert(Registration).values({
//         clubId: Club.id,
//         clubNameKr: parameter.krName,
//         clubNameEn: parameter.enName,
//         studentId: Student.id,
//         foundedAt: parameter.foundedAt,
//         divisionId: parameter.divisionId,
//         activityFieldKr: parameter.activityPlanFileId,
//         professorId: parameter.professor,
//         divisionConsistency: parameter.divisionIntegrity,
//         foundationPurpose: parameter.foundationPurpose,
//         activityPlan: parameter.activityPlan,
//         registrationApplicationTypeEnumId: parameter.registrationTypeEnumId,
//         registrationApplicationStatusEnumId: Status.Promotional,
//         // professorApprovedAt :
//       });

//       if (registrationInsertResult.affectedRows !== 1) {
//         logger.debug("[postRegistration] rollback occurs");
//         tx.rollback();
//       }
//     });

//     return [];
//   }
// }
