import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";
import {
  RegistrationDeadlineEnum,
  RegistrationStatusEnum,
  RegistrationTypeEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";

const mockClubRegister = {
  items: [
    {
      registrationStatusEnum: RegistrationStatusEnum.Pending,
      registrationTypeEnum: RegistrationTypeEnum.NewProvisional,
      clubDivision: "생활문화",
      clubNameKr: "술박스",
      activityFieldKr: "개발개발한 어떤 활동",
      professorName: "박지호",
      clubId: 1,
    },
  ],
  total: 1,
  offset: 1,
};

const mockProfClubRegister = {
  items: [
    {
      clubId: 23,
      registrationStatusEnumId: RegistrationStatusEnum.Pending,
      division: { id: 1, name: "생활문화" },
      clubName: "술박스",
      student: {
        id: 1,
        studentNumber: 20200000,
        name: "이지윤",
        phoneNumber: "000-0000-0000",
        email: "xxxxx@kaist.ac.kr",
      },
      professorSignedAt: new Date(),
    },
  ],
};
const mockMemberRegister = {
  applies: [
    {
      applyStatusEnum: RegistrationStatusEnum.Pending,
      clubType: { type: ClubTypeEnum.Regular, isPermanent: false },
      clubDivision: "생활문화",
      clubNameKr: "술박스",
      clubId: 1,
    },
    {
      applyStatusEnum: RegistrationStatusEnum.Pending,
      clubType: { type: ClubTypeEnum.Regular, isPermanent: true },
      clubDivision: "밴드음악",
      clubNameKr: "술박스",
      clubId: 1,
    },
    {
      applyStatusEnum: RegistrationStatusEnum.Pending,
      clubType: { type: ClubTypeEnum.Provisional, isPermanent: false },
      clubDivision: "사회",
      clubNameKr: "술박스",
      clubId: 1,
    },
    {
      applyStatusEnum: RegistrationStatusEnum.Pending,
      clubType: { type: ClubTypeEnum.Provisional, isPermanent: false },
      clubDivision: "보컬음악",
      clubNameKr: "술박스",
      clubId: 1,
    },
  ],
};
const mockRegisterPeriod = [
  RegistrationDeadlineEnum.ClubRegistrationApplication,
  RegistrationDeadlineEnum.StudentRegistrationApplication,
];

export {
  mockClubRegister,
  mockProfClubRegister,
  mockMemberRegister,
  mockRegisterPeriod,
};
