import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zClubName } from "@sparcs-clubs/interface/common/commonString";
import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import { ProfessorEnum } from "@sparcs-clubs/interface/common/enum/user.enum";
import { zKrPhoneNumber } from "@sparcs-clubs/interface/common/type/phoneNumber.type";

import registrationTypeEnumChecker from "../utils/registrationTypeEnumChecker";

/**
 * @version v0.1
 * @description 동아리 등록 수정
 */

const url = (applyId: string) =>
  `/student/registrations/club-registrations/club-registration/${applyId}`;
const method = "PUT";

const requestParam = z.object({
  applyId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z
  .object({
    registrationTypeEnumId: z.nativeEnum(RegistrationTypeEnum),
    clubId: z.coerce.number().int().min(1).optional(),
    clubNameKr: zClubName,
    clubNameEn: zClubName,
    phoneNumber: zKrPhoneNumber,
    foundedAt: z.coerce.date(),
    divisionId: z.coerce.number().int().min(1),
    activityFieldKr: z.string().max(255),
    activityFieldEn: z.string().max(255),
    professor: z
      .object({
        name: z.coerce.string().max(255),
        email: z
          .string()
          .email()
          .refine(email => email.endsWith("@kaist.ac.kr"), {
            message: "Must be a valid KAIST email address",
          }),
        professorEnumId: z.nativeEnum(ProfessorEnum),
      })
      .optional(),
    divisionConsistency: z.coerce.string().max(255),
    foundationPurpose: z.coerce.string().max(500),
    activityPlan: z.coerce.string().max(500),
    activityPlanFileId: z.coerce.string().max(128).optional(),
    clubRuleFileId: z.coerce.string().max(128).optional(),
    externalInstructionFileId: z.coerce.string().max(128).optional(),
  })
  .refine(args => registrationTypeEnumChecker(args));

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiReg009 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg009RequestParam = z.infer<typeof apiReg009.requestParam>;
type ApiReg009RequestQuery = z.infer<typeof apiReg009.requestQuery>;
type ApiReg009RequestBody = z.infer<typeof apiReg009.requestBody>;
type ApiReg009ResponseOk = z.infer<(typeof apiReg009.responseBodyMap)[200]>;

export default apiReg009;

export type {
  ApiReg009RequestParam,
  ApiReg009RequestQuery,
  ApiReg009RequestBody,
  ApiReg009ResponseOk,
};
