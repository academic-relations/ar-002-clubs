import { ProgressCheckSectionStatusEnum } from "@sparcs-clubs/web/common/components/ProgressCheckSection/progressCheckStationStatus";
import RegisterClubTypeEnum from "@sparcs-clubs/web/features/executive/register-club/constants/registerClubType";

import { ClubRegisterDetail } from "@sparcs-clubs/web/features/executive/register-club/frames/ClubRegisterDetailFrame";

import { ActivityProfessorApprovalEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

export const mockClubRegisterDetail: ClubRegisterDetail = {
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
  attachmentList: {},
  professorApproval: ActivityProfessorApprovalEnum.Requested,
  activityReports: true,
};
