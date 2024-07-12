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

const requestBody = z.object({
  registrationTypeEnumId: z.nativeEnum(RegistrationTypeEnum),
  krName: zClubName,
  enName: zClubName,
  studentId: z.coerce.number().int().min(1), // 동아리 대표자 학생 id
  phoneNumber: zKrPhoneNumber, // 대표자 전화번호
  foundedAt: z.coerce.date(), // 입력받은 날짜에 상관없에 연도값만이 저장됩니다.
  divisionId: z.coerce.number().int().min(1),
  kr활동분야: z.string(),
  en활동분야: z.string(),
  /**
   * 지도교수 매개변수는 가동아리 신청의 경우 undefined여야 합니다.
   * 신규등록 | 재등록의 경우 지도교수란이 기입되어 있으면 지도교수를 포함한 신청이고,
   * 없다면 지도교수 없는 동아리 신청으로 처리됩니다.
   */
  professor: z.union([
    z.undefined(),
    z.object({
      name: z.string(),
      mail: z
        .string()
        .email()
        .refine(email => email.endsWith("@kaist.ac.kr"), {
          message: "Must be a valid KAIST email address",
        }),
      ProfessorEnumId: z.nativeEnum(ProfessorEnum),
    }),
  ]),
  divisionIntegrity: z.string(), // 길이제한이 추가될 수 있습니다.
  foundationPurpose: z.string(), // 길이제한이 추가될 수 있습니다.
  activityPlan: z.string(), // 길이제한이 추가될 수 있습니다.
  /**
   * 활동계획서 파일은 가등록인 경우 undefined,
   * 신규등록 | 재등록의 경우 업로드한 파일 id가 존재해야 합니다.,
   */
  activityPlanFileId: z.union([z.undefined(), z.number().int().positive()]),
  /**
   * 동아리 회칙 파일은 가등록 | 재등록인 경우 undefined,
   * 신규등록의 경우 업로드한 파일 id가 존재해야 합니다.,
   */
  clubRuleFileId: z.union([z.undefined(), z.number().int().positive()]),
  /**
   * 외부강사 초빙 계획 회칙 파일은 항상 optional 합니다.
   */
  externelInstructionFileId: z.union([
    z.undefined(),
    z.number().int().positive(),
  ]),
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
