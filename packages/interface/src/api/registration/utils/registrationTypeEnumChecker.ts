import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

/**
 * @description 인터페이스에서의 RegistrationTypeEnum에 따른 clubId와 clubRuleFileId 존재 여부 검사 규칙입니다.
 */
const registrationTypeEnumChecker = (param: {
  registrationTypeEnumId: RegistrationTypeEnum;
  clubId?: number;
  clubRuleFileId?: string;
}): boolean => {
  switch (param.registrationTypeEnumId) {
    case RegistrationTypeEnum.NewProvisional:
      if (param.clubId !== undefined) return false;
      if (param.clubRuleFileId !== undefined) return false;
      break;
    case RegistrationTypeEnum.ReProvisional:
      if (param.clubId === undefined) return false;
      if (param.clubRuleFileId !== undefined) return false;
      break;
    case RegistrationTypeEnum.Promotional:
      if (param.clubId === undefined) return false;
      if (param.clubRuleFileId === undefined) return false;
      break;
    case RegistrationTypeEnum.Renewal:
      if (param.clubId === undefined) return false;
      if (param.clubRuleFileId !== undefined) return false;
      break;
    default:
      break;
  }
  return true;
};

export default registrationTypeEnumChecker;
