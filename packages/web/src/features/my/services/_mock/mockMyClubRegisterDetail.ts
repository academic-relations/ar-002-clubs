import {
  RegistrationStatusEnum,
  RegistrationTypeEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";
import { ProfessorEnum } from "@sparcs-clubs/interface/common/enum/user.enum";

import { ActivityTypeEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

const mockMyClubRegisterDetail = {
  id: 1,
  registrationStatusEnum: RegistrationStatusEnum.Pending,
  registrationTypeEnum: RegistrationTypeEnum.Promotional,
  clubNameKr: "스팍스",
  clubId: 1,
  studentName: "이지윤",
  phoneNumber: "010-XXXX-XXXX",
  foundedYear: 2020,
  clubDivision: "생활체육",
  activityFieldKr: "개발",
  activityFieldEn: "Gaebal",
  professorName: "이교수",
  professorEnum: ProfessorEnum.Full,
  professorEmail: "gyosu@kaist.ac.kr",
  professorConfirm: false,
  divisionConsistency: "어쩌구저쩌구",
  foundationPurpose: "어쩌구저쩌구",
  activityPlan: "어쩌구저쩌구",
  externalInstructionFileId: undefined,
};

const mockMyClubRegisterAcf = {
  items: [
    {
      activityName: "개발개발한 어떠한 활동",
      activityType: ActivityTypeEnum.FitInside,
      activityStart: new Date(`2024-03-11T12:00:00Z`),
      activityEnd: new Date(`2024-03-18T12:00:00Z`),
    },
    {
      activityName: "개발개발한 어떠한 활동",
      activityType: ActivityTypeEnum.FitOutside,
      activityStart: new Date(`2024-03-11T12:00:00Z`),
      activityEnd: new Date(`2024-03-18T12:00:00Z`),
    },
    {
      activityName: "개발개발한 어떠한 활동",
      activityType: ActivityTypeEnum.NotFit,
      activityStart: new Date(`2024-03-11T12:00:00Z`),
      activityEnd: new Date(`2024-03-18T12:00:00Z`),
    },
  ],
  total: 3,
  offset: 3,
};

export { mockMyClubRegisterDetail, mockMyClubRegisterAcf };
