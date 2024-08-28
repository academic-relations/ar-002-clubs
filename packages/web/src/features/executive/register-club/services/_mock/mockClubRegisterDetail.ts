import { ProgressCheckSectionStatusEnum } from "@sparcs-clubs/web/common/components/ProgressCheckSection/progressCheckStationStatus";
import RegisterClubTypeEnum from "@sparcs-clubs/web/features/executive/register-club/constants/registerClubType";

import { ActivityProfessorApprovalEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

export const mockClubRegisterDetail = {
  statusAndDate: [
    {
      status: ProgressCheckSectionStatusEnum.Approved,
      date: undefined,
    },
    {
      status: ProgressCheckSectionStatusEnum.Canceled,
      date: new Date(2024, 3, 11, 21, 0),
    },
  ],
  registerClubType: RegisterClubTypeEnum.Promotional,
  clubName: "스팍스",
  representativeName: "이지윤",
  representativePhoneNumber: "010-XXXX-XXXX",
  estYear: 2020,
  divisionName: "생활체육",
  fieldKR: "개발",
  fieldEN: "gaebal",
  professorName: "이교수",
  professorPosition: "정교수",
  professorEmail: "gyosu@kaist.ac.kr",
  clubDetail: {
    "분과 정합성": "어쩌고 저쩌고",
    "설립 목적": "어쩌고 저쩌고",
    "주요 활동 계획": "어쩌고 저쩌고",
  },
  attachmentList: {
    "활동계획서": [
      {
        src: "https://s3-alpha-sig.figma.com/img/2366/aaf2/b01ae268e4d7bcc364f8c2bd2ff5aa70?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c~Cp3X8hCrrzSiZHtgnJtMGYNHx6EWp7UbFAeMBwct0v4W6ob59~oZSCNF-fgATlDXF2x7eDHjuansFUzqptCGHHBbaTViXLyjZvBj7DB5S1Bc7u-iW0jwS7iE9nS~wJCf0zh6Am~1GhHp1K7C6KNXLrsbs5qf1fheixjyZ0Mlei~Pyt7Y3XjDm3LUmjDK2gpoXCjuDBNW1veL9gxSuXTMtzZIlgXwkze0wkqSK9dKG~akmA6zXqS~Ls9v4gjyAGZtNLY3nSA7muTkZsdYNnJAGAkHHbcTuLRtKIAniRhIrsmS8WOPsXL71UbFDDM8CUzPsM5tBj8fxlUfxaGSbQRA__",
        name: "dora-is-very-cute.jpg",
      },
    ],
    "(선택) 외부 강사 지도 계획서": [
      {
        src: "https://s3-alpha-sig.figma.com/img/2366/aaf2/b01ae268e4d7bcc364f8c2bd2ff5aa70?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c~Cp3X8hCrrzSiZHtgnJtMGYNHx6EWp7UbFAeMBwct0v4W6ob59~oZSCNF-fgATlDXF2x7eDHjuansFUzqptCGHHBbaTViXLyjZvBj7DB5S1Bc7u-iW0jwS7iE9nS~wJCf0zh6Am~1GhHp1K7C6KNXLrsbs5qf1fheixjyZ0Mlei~Pyt7Y3XjDm3LUmjDK2gpoXCjuDBNW1veL9gxSuXTMtzZIlgXwkze0wkqSK9dKG~akmA6zXqS~Ls9v4gjyAGZtNLY3nSA7muTkZsdYNnJAGAkHHbcTuLRtKIAniRhIrsmS8WOPsXL71UbFDDM8CUzPsM5tBj8fxlUfxaGSbQRA__",
        name: "dora-is-very-cute.jpg",
      },
      {
        src: "https://s3-alpha-sig.figma.com/img/2366/aaf2/b01ae268e4d7bcc364f8c2bd2ff5aa70?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c~Cp3X8hCrrzSiZHtgnJtMGYNHx6EWp7UbFAeMBwct0v4W6ob59~oZSCNF-fgATlDXF2x7eDHjuansFUzqptCGHHBbaTViXLyjZvBj7DB5S1Bc7u-iW0jwS7iE9nS~wJCf0zh6Am~1GhHp1K7C6KNXLrsbs5qf1fheixjyZ0Mlei~Pyt7Y3XjDm3LUmjDK2gpoXCjuDBNW1veL9gxSuXTMtzZIlgXwkze0wkqSK9dKG~akmA6zXqS~Ls9v4gjyAGZtNLY3nSA7muTkZsdYNnJAGAkHHbcTuLRtKIAniRhIrsmS8WOPsXL71UbFDDM8CUzPsM5tBj8fxlUfxaGSbQRA__",
        name: "dora-is-very-cute.jpg",
      },
    ],
  },
  professorApproval: ActivityProfessorApprovalEnum.Requested,
  activityReports: true,
};
