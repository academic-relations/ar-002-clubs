import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zClubName } from "@sparcs-clubs/interface/common/commonString";
import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import { ProfessorEnum } from "@sparcs-clubs/interface/common/enum/user.enum";
import { zKrPhoneNumber } from "@sparcs-clubs/interface/common/type/phoneNumber.type";

/**
 * @version v0.1
 * @description 새로운 동아리 등록을 신청합니다.
 * 신청의 종류는 다음과 같습니다.(가동아리 등록, 신규 동아리 등록, 재등록)
 * 신청의 종류에 따라 RequestBody의 검사 규칙이 다릅니다.
 */

const url = () => `/student/registration`;
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z
  .object({
    clubId: z.coerce.number().int().min(1).optional(),
    registrationTypeEnumId: z.nativeEnum(RegistrationTypeEnum),
    clubNameKr: zClubName,
    clubNameEn: zClubName,
    studentId: z.coerce.number().int().min(1), // 동아리 대표자 학생 id
    phoneNumber: zKrPhoneNumber, // 대표자 전화번호
    /**
     * 가동아리 신청의 경우 설립연월이 신청에 포함됩니다.
     * 신규등록 | 재등록의 경우 설립연도가 신청에 포함됩니다.
     */
    foundedAt: z.coerce.date(),
    divisionId: z.coerce.number().int().min(1),
    activityFieldKr: z.string().max(255),
    activityFieldEn: z.string().max(255),
    /**
     * 지도교수란이 기입되어 있으면 지도교수를 포함한 신청이고,
     * 없다면 지도교수 없는 동아리 신청으로 처리됩니다.
     */
    professor: z
      .object({
        name: z.string(),
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
    activityPlan: z.coerce.string().max(500), // 길이제한이 추가될 수 있습니다.
    activityPlanFileId: z.coerce.string().max(128),
    /**
     * 동아리 회칙 파일은 가등록 | 재등록인 경우 undefined,
     * 신규등록의 경우 업로드한 파일 id가 존재해야 합니다.,
     */
    clubRuleFileId: z.coerce.string().max(128).optional(),
    /**
     * 외부강사 초빙 계획 회칙 파일은 항상 optional 합니다.
     */
    externalInstructionFileId: z.coerce.string().max(128).optional(),
  })
  .refine(args => {
    // - 신규 가동아리 신청을 제외하곤 기존 동아리 id를 제출해야 합니다.
    switch (args.registrationTypeEnumId) {
      case RegistrationTypeEnum.NewProvisional:
        if (args.clubId !== undefined) return false;
        if (args.clubRuleFileId !== undefined) return false;
        break;
      case RegistrationTypeEnum.ReProvisional:
        if (args.clubId === undefined) return false;
        if (args.clubRuleFileId !== undefined) return false;
        break;
      case RegistrationTypeEnum.Promotional:
        if (args.clubId === undefined) return false;
        if (args.clubRuleFileId === undefined) return false;
        break;
      case RegistrationTypeEnum.Renewal:
        if (args.clubId === undefined) return false;
        if (args.clubRuleFileId !== undefined) return false;
        break;
      default:
        break;
    }
    return true;
  });

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiReg001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg001RequestParam = z.infer<typeof apiReg001.requestParam>;
type ApiReg001RequestQuery = z.infer<typeof apiReg001.requestQuery>;
type ApiReg001RequestBody = z.infer<typeof apiReg001.requestBody>;
type ApiReg001ResponseCreated = z.infer<
  (typeof apiReg001.responseBodyMap)[201]
>;

export default apiReg001;

export type {
  ApiReg001RequestParam,
  ApiReg001RequestQuery,
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
};
