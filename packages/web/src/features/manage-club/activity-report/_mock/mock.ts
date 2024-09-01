import { ApiAct002ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct002";
import { ApiAct011ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct011";

import {
  ActivityStatusEnum,
  ActivityTypeEnum,
} from "@sparcs-clubs/interface/common/enum/activity.enum";

import { ActivityProfessorApprovalEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

import { Participant } from "../types/activityReport";

export interface ParticipantTemp {
  studentId: number; // 고유 ID
  studentNumber: number; // 학번
  name: string; // 이름
}

export interface ApiAct002ResponseOkTemp
  extends Omit<ApiAct002ResponseOk, "participants"> {
  advisorProfessorApproval: ActivityProfessorApprovalEnum; // 지도교수 승인 상태
  activityStatusEnumId: ActivityStatusEnum; // 신청 상태 (동연 승인 등)
  participants: ParticipantTemp[];
  writtenTime: Date; // 작성 시간
  checkedTime?: Date; // 승인 또는 반려한 시간
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
    status: "신청",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 내부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
    professorApproval: "대기",
  },
  {
    status: "운위",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 외부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
    professorApproval: "완료",
  },
  {
    status: "반려",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 외부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
    professorApproval: "반려",
  },
  {
    status: "승인",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 내부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
    professorApproval: "완료",
  },
  {
    status: "승인",
    activity: "2024년도 봄의기 MT",
    category: "동아리 성격에 합치하지 않는 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
    professorApproval: "완료",
  },
];

export type PastActivityReport = {
  id: number;
  name: string;
  activityTypeEnumId: number;
  durations: {
    startTerm: Date;
    endTerm: Date;
  }[];
};

export const mockPastActivityData: ApiAct011ResponseOk = {
  activities: [
    {
      id: 1,
      name: "개발개발한 어떠한 활동",
      activityTypeEnumId: 1,
      durations: [
        {
          startTerm: new Date("2024-03-11"),
          endTerm: new Date("2024-03-18"),
        },
      ],
    },
    {
      id: 2,
      name: "개발개발한 어떠한 활동",
      activityTypeEnumId: 1,
      durations: [
        {
          startTerm: new Date("2024-03-11"),
          endTerm: new Date("2024-03-18"),
        },
      ],
    },
    {
      id: 3,
      name: "개발개발한 어떠한 활동",
      activityTypeEnumId: 2,
      durations: [
        {
          startTerm: new Date("2024-03-11"),
          endTerm: new Date("2024-03-18"),
        },
        {
          startTerm: new Date("2024-03-11"),
          endTerm: new Date("2024-03-18"),
        },
      ],
    },
    {
      id: 4,
      name: "개발개발한 어떠한 활동",
      activityTypeEnumId: 2,
      durations: [
        {
          startTerm: new Date("2024-03-11"),
          endTerm: new Date("2024-03-18"),
        },
        {
          startTerm: new Date("2024-03-11"),
          endTerm: new Date("2024-03-18"),
        },
        {
          startTerm: new Date("2024-03-11"),
          endTerm: new Date("2024-03-18"),
        },
      ],
    },
    {
      id: 5,
      name: "개발개발한 어떠한 활동",
      activityTypeEnumId: 3,
      durations: [
        {
          startTerm: new Date("2024-03-11"),
          endTerm: new Date("2024-03-18"),
        },
      ],
    },
    {
      id: 6,
      name: "개발개발한 어떠한 활동",
      activityTypeEnumId: 3,
      durations: [
        {
          startTerm: new Date("2024-03-11"),
          endTerm: new Date("2024-03-18"),
        },
      ],
    },
  ],
};

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
  activityStatusEnumId: ActivityStatusEnum.Rejected,
  activityTypeEnumId: ActivityTypeEnum.matchedInternalActivity,
  writtenTime: new Date("2024-07-01 13:00"),
  checkedTime: new Date("2024-07-02 13:00"),
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
      studentId: 1,
      studentNumber: 20200510,
      name: "이지윤",
    },
    {
      studentId: 2,
      studentNumber: 20200511,
      name: "박병찬",
    },
    {
      studentId: 3,
      studentNumber: 20230510,
      name: "이도라",
    },
    {
      studentId: 4,
      studentNumber: 20240510,
      name: "스팍스",
    },
  ],
  advisorProfessorApproval: ActivityProfessorApprovalEnum.Requested,
};
