import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zClubName } from "@sparcs-clubs/interface/common/commonString";

import {
  RegistrationStatusEnum,
  RegistrationTypeEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";

import { ProfessorEnum } from "@sparcs-clubs/interface/common/enum/user.enum";
import { zKrPhoneNumber } from "@sparcs-clubs/interface/common/type/phoneNumber.type";

import registrationTypeEnumChecker from "../utils/registrationTypeEnumChecker";

/**
 * @version v0.1
 * @description 동아리 등록 조회
 */

const url = (applyId: string) =>
  `/student/registrations/club-registrations/club-registration/${applyId}`;
const method = "GET";

const requestParam = z.object({
  applyId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z
    .object({
      id: z.coerce.number().int().min(1),
      registrationTypeEnumId: z.nativeEnum(RegistrationTypeEnum),
      registrationStatusEnumId: z.nativeEnum(RegistrationStatusEnum),
      clubId: z.coerce.number().int().min(1).optional(),
      clubNameKr: zClubName,
      clubNameEn: zClubName,
      representative: z.object({
        studentNumber: z.coerce.number().int().min(1),
        name: z.string().max(30),
      }),
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
      activityPlanFileName: z.coerce.string().max(255).optional(),
      clubRuleFileId: z.coerce.string().max(128).optional(),
      clubRuleFileName: z.coerce.string().max(255).optional(),
      externalInstructionFileId: z.coerce.string().max(128).optional(),
      externalInstructionFileName: z.coerce.string().max(255).optional(),
      isProfessorSigned: z.coerce.boolean(),
      updatedAt: z.coerce.date(),
      comments: z.array(
        z.object({
          content: z.string(),
          createdAt: z.coerce.date(),
        }),
      ),
    })
    .refine(args => registrationTypeEnumChecker(args)),
};

const responseErrorMap = {};

const apiReg011 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg011RequestParam = z.infer<typeof apiReg011.requestParam>;
type ApiReg011RequestQuery = z.infer<typeof apiReg011.requestQuery>;
type ApiReg011RequestBody = z.infer<typeof apiReg011.requestBody>;
type ApiReg011ResponseOk = z.infer<(typeof apiReg011.responseBodyMap)[200]>;

export default apiReg011;

export type {
  ApiReg011RequestParam,
  ApiReg011RequestQuery,
  ApiReg011RequestBody,
  ApiReg011ResponseOk,
};
