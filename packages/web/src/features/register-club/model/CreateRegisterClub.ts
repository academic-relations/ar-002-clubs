import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import { ProfessorEnum } from "@sparcs-clubs/interface/common/enum/user.enum";

interface CreateRegisterClubBase {
  registrationTypeEnumsId: RegistrationTypeEnum;

  clubNameKr: string;
  clubNameEn: string;
  phoneNumber: string;
  foundedAt: Date;
  divisionId: number;
  activityFieldKr: string;
  activityFieldEn: string;
  professor: {
    name: string;
    email: string;
    professorEnumId: ProfessorEnum;
  };
  divisionConsistency: string;
  foundationPurpose: string;
  activityPlan: string;
  activityPlanFileId: string;
  clubRuleFileId: string;
  externalInstructionFileId: string;
}

export interface CreateRegisterClubForRenewal extends CreateRegisterClubBase {
  registrationTypeEnumsId: RegistrationTypeEnum.Renewal;
  clubId: number;
  year: number;
}

export interface CreateRegisterClubForPromotional
  extends CreateRegisterClubBase {
  registrationTypeEnumsId: RegistrationTypeEnum.Promotional;
  clubId: number;
  year: number;
}

export interface CreateRegisterClubForNewProvisional
  extends CreateRegisterClubBase {
  registrationTypeEnumsId: RegistrationTypeEnum.NewProvisional;
  clubId: number;
  year: number;
  month: number;
}

export interface CreateRegisterClubForReProvisional
  extends CreateRegisterClubBase {
  registrationTypeEnumsId: RegistrationTypeEnum.ReProvisional;
  year: number;
  month: number;
}
