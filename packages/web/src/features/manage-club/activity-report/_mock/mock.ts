import { ApiAct002ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct002";

import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import { ActivityProfessorApprovalEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

import { Participant } from "../types/activityReport";

export interface ApiAct002ResponseOkTemp extends ApiAct002ResponseOk {
  advisorProfessorApproval: ActivityProfessorApprovalEnum;
}

export const mockNewActivityData = [
  {
    status: "신청",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 내부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
    professorApproval: "대기",
  },
  {
    status: "신청 완료",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 내부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
    professorApproval: "대기",
  },
  {
    status: "신청 완료",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 외부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
    professorApproval: "완료",
  },
  {
    status: "신청 반려",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 외부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
    professorApproval: "반려",
  },
  {
    status: "승인 완료",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 내부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
    professorApproval: "완료",
  },
  {
    status: "승인 완료",
    activity: "2024년도 봄의기 MT",
    category: "동아리 성격에 합치하지 않는 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
    professorApproval: "완료",
  },
];

export const mockPastActivityData = [
  {
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 내부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 내부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 외부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 외부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 내부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    activity: "2024년도 봄의기 MT",
    category: "동아리 성격에 합치하지 않는 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
];

export const mockParticipantData: Participant[] = [
  {
    studentId: "20200515",
    name: "이지윤",
    phoneNumber: "XXX-XXXX-XXXX",
    email: "nicolelee2001@kaist.ac.kr",
  },
  {
    studentId: "20210514",
    name: "박지윤",
    phoneNumber: "XXX-XXXX-XXXX",
    email: "nicolelee2001@kaist.ac.kr",
  },
  {
    studentId: "20200513",
    name: "박병찬",
    phoneNumber: "XXX-XXXX-XXXX",
    email: "nicolelee2001@kaist.ac.kr",
  },
  {
    studentId: "20230512",
    name: "이도라",
    phoneNumber: "XXX-XXXX-XXXX",
    email: "nicolelee2001@kaist.ac.kr",
  },
  {
    studentId: "20240510",
    name: "스팍스",
    phoneNumber: "XXX-XXXX-XXXX",
    email: "nicolelee2001@kaist.ac.kr",
  },
  {
    studentId: "20200230",
    name: "스팍스",
    phoneNumber: "XXX-XXXX-XXXX",
    email: "nicolelee2001@kaist.ac.kr",
  },
];

export const mockActivityDetailData: ApiAct002ResponseOkTemp = {
  clubId: 1,
  originalName: "술박스",
  name: "스팍스 봄학기 해커톤",
  activityTypeEnumId: ActivityTypeEnum.matchedInternalActivity,
  durations: [
    {
      startTerm: new Date("2024-07-01"),
      endTerm: new Date("2024-08-15"),
    },
  ],
  location: "동아리방",
  purpose: "동아리 회원 개발 실력 향상",
  detail: "밤을 새서 개발을 했다.",
  evidence: "증거",
  evidenceFiles: [
    {
      uuid: "file-uuid",
    },
    {
      uuid: "file-uuid2",
    },
  ],
  participants: [
    {
      studentId: 20200510,
    },
    {
      studentId: 20200511,
    },
    {
      studentId: 20230510,
    },
    {
      studentId: 20240510,
    },
  ],
  advisorProfessorApproval: ActivityProfessorApprovalEnum.Requested,
};
