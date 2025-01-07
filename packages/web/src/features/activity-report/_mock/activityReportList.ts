import {
  ActivityStatusEnum,
  ActivityTypeEnum,
} from "@sparcs-clubs/interface/common/enum/activity.enum";

import { ActivityProfessorApprovalEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

export const mockActivityReportData = [
  {
    id: 1,
    name: "2024 가을학기 신입생 프로그래밍 교육",
    activityTypeEnumId: ActivityTypeEnum.matchedInternalActivity,
    activityStatusEnumId: ActivityStatusEnum.Applied,
    professorApproval: ActivityProfessorApprovalEnum.Requested,
    location: "N1 102호",
    purpose: "신입생 프로그래밍 기초 교육",
    detail: "Python 기초 문법부터 알고리즘까지 단계별 교육",
    evidence: "출석부, 강의자료",
    participants: [
      { id: 1, name: "김철수", studentNumber: 20240001 },
      { id: 2, name: "이영희", studentNumber: 20240002 },
      { id: 3, name: "박지민", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-09-01"),
        endTerm: new Date("2024-11-30"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: null,
  },
  {
    id: 2,
    name: "오픈소스 프로젝트 기여 활동",
    activityTypeEnumId: ActivityTypeEnum.matchedExternalActivity,
    activityStatusEnumId: ActivityStatusEnum.Approved,
    professorApproval: ActivityProfessorApprovalEnum.Approved,
    location: "온라인",
    purpose: "오픈소스 생태계 기여",
    detail: "React 커뮤니티 버그 수정 및 문서화 작업",
    evidence: "Github PR 내역",
    participants: [
      { id: 1, name: "장민수", studentNumber: 20240001 },
      { id: 2, name: "김도현", studentNumber: 20240002 },
    ],
    durations: [
      {
        startTerm: new Date("2024-07-15"),
        endTerm: new Date("2024-08-15"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: null,
  },
  {
    id: 3,
    name: "동아리 홈페이지 리뉴얼 프로젝트",
    activityTypeEnumId: ActivityTypeEnum.notMatchedActivity,
    activityStatusEnumId: ActivityStatusEnum.Rejected,
    professorApproval: ActivityProfessorApprovalEnum.Denied,
    location: "N1 204호",
    purpose: "동아리 인프라 개선",
    detail: "기존 홈페이지 리뉴얼 및 기능 개선",
    evidence: "기획서, 개발 문서",
    participants: [
      { id: 1, name: "이지원", studentNumber: 20240001 },
      { id: 2, name: "박현우", studentNumber: 20240002 },
    ],
    durations: [
      {
        startTerm: new Date("2024-08-01"),
        endTerm: new Date("2024-09-30"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-08-01"),
  },
  {
    id: 4,
    name: "AI 스터디 그룹 운영",
    activityTypeEnumId: ActivityTypeEnum.matchedInternalActivity,
    activityStatusEnumId: ActivityStatusEnum.Applied,
    professorApproval: ActivityProfessorApprovalEnum.Requested,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-07-01"),
        endTerm: new Date("2024-08-15"),
      },
      {
        startTerm: new Date("2024-08-20"),
        endTerm: new Date("2024-09-30"),
      },
      {
        startTerm: new Date("2024-10-01"),
        endTerm: new Date("2024-11-30"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-07-01"),
  },
  {
    id: 5,
    name: "가을학기 알고리즘 대회",
    activityTypeEnumId: ActivityTypeEnum.matchedExternalActivity,
    activityStatusEnumId: ActivityStatusEnum.Approved,
    professorApproval: ActivityProfessorApprovalEnum.Approved,
    location: "N1 대강당",
    purpose: "알고리즘 실력 향상",
    detail: "알고리즘 대회 개최 및 운영",
    evidence: "대회 결과물, 시상 내역",
    participants: [
      { id: 1, name: "현빈", studentNumber: 20240001 },
      { id: 2, name: "송혜교", studentNumber: 20240002 },
    ],
    durations: [
      {
        startTerm: new Date("2024-09-15"),
        endTerm: new Date("2024-09-16"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-09-15"),
  },
  {
    id: 6,
    name: "클라우드 인프라 구축 프로젝트",
    activityTypeEnumId: ActivityTypeEnum.notMatchedActivity,
    activityStatusEnumId: ActivityStatusEnum.Applied,
    professorApproval: ActivityProfessorApprovalEnum.Requested,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-08-01"),
        endTerm: new Date("2024-10-31"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-08-01"),
  },
  {
    id: 7,
    name: "기술 블로그 운영",
    activityTypeEnumId: ActivityTypeEnum.matchedInternalActivity,
    activityStatusEnumId: ActivityStatusEnum.Approved,
    professorApproval: ActivityProfessorApprovalEnum.Approved,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-07-01"),
        endTerm: new Date("2024-08-31"),
      },
      {
        startTerm: new Date("2024-09-01"),
        endTerm: new Date("2024-10-31"),
      },
      {
        startTerm: new Date("2024-11-01"),
        endTerm: new Date("2024-11-30"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-07-01"),
  },
  {
    id: 8,
    name: "신입회원 멘토링 프로그램",
    activityTypeEnumId: ActivityTypeEnum.matchedExternalActivity,
    activityStatusEnumId: ActivityStatusEnum.Applied,
    professorApproval: ActivityProfessorApprovalEnum.Requested,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-09-01"),
        endTerm: new Date("2024-11-30"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-09-01"),
  },
  {
    id: 9,
    name: "보안 취약점 분석 프로젝트",
    activityTypeEnumId: ActivityTypeEnum.notMatchedActivity,
    activityStatusEnumId: ActivityStatusEnum.Rejected,
    professorApproval: ActivityProfessorApprovalEnum.Denied,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-07-15"),
        endTerm: new Date("2024-08-31"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-07-15"),
  },
  {
    id: 10,
    name: "데이터베이스 최적화 스터디",
    activityTypeEnumId: ActivityTypeEnum.matchedInternalActivity,
    activityStatusEnumId: ActivityStatusEnum.Applied,
    professorApproval: ActivityProfessorApprovalEnum.Requested,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-08-15"),
        endTerm: new Date("2024-10-15"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-08-15"),
  },
  {
    id: 11,
    name: "모바일 앱 개발 워크샵",
    activityTypeEnumId: ActivityTypeEnum.matchedExternalActivity,
    activityStatusEnumId: ActivityStatusEnum.Approved,
    professorApproval: ActivityProfessorApprovalEnum.Approved,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-09-10"),
        endTerm: new Date("2024-09-20"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-09-10"),
  },
  {
    id: 12,
    name: "DevOps 파이프라인 구축",
    activityTypeEnumId: ActivityTypeEnum.notMatchedActivity,
    activityStatusEnumId: ActivityStatusEnum.Applied,
    professorApproval: ActivityProfessorApprovalEnum.Requested,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-07-01"),
        endTerm: new Date("2024-09-30"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-07-01"),
  },
  {
    id: 13,
    name: "코딩 테스트 대비 스터디",
    activityTypeEnumId: ActivityTypeEnum.matchedInternalActivity,
    activityStatusEnumId: ActivityStatusEnum.Approved,
    professorApproval: ActivityProfessorApprovalEnum.Approved,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-08-01"),
        endTerm: new Date("2024-08-31"),
      },
      {
        startTerm: new Date("2024-09-01"),
        endTerm: new Date("2024-09-30"),
      },
      {
        startTerm: new Date("2024-10-01"),
        endTerm: new Date("2024-10-31"),
      },
      {
        startTerm: new Date("2024-11-01"),
        endTerm: new Date("2024-11-30"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-08-01"),
  },
  {
    id: 14,
    name: "웹 접근성 개선 프로젝트",
    activityTypeEnumId: ActivityTypeEnum.matchedExternalActivity,
    activityStatusEnumId: ActivityStatusEnum.Applied,
    professorApproval: ActivityProfessorApprovalEnum.Requested,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-09-01"),
        endTerm: new Date("2024-10-31"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-09-01"),
  },
  {
    id: 15,
    name: "머신러닝 모델 최적화 연구",
    activityTypeEnumId: ActivityTypeEnum.notMatchedActivity,
    activityStatusEnumId: ActivityStatusEnum.Rejected,
    professorApproval: ActivityProfessorApprovalEnum.Denied,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-07-15"),
        endTerm: new Date("2024-09-15"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-07-15"),
  },
  {
    id: 16,
    name: "오픈소스 컨트리뷰톤 참가",
    activityTypeEnumId: ActivityTypeEnum.matchedInternalActivity,
    activityStatusEnumId: ActivityStatusEnum.Applied,
    professorApproval: ActivityProfessorApprovalEnum.Requested,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-10-01"),
        endTerm: new Date("2024-10-15"),
      },
      {
        startTerm: new Date("2024-10-16"),
        endTerm: new Date("2024-10-31"),
      },
      {
        startTerm: new Date("2024-11-01"),
        endTerm: new Date("2024-11-15"),
      },
      {
        startTerm: new Date("2024-11-16"),
        endTerm: new Date("2024-11-30"),
      },
      {
        startTerm: new Date("2024-12-01"),
        endTerm: new Date("2024-12-15"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-10-01"),
  },
  {
    id: 17,
    name: "블록체인 기술 세미나",
    activityTypeEnumId: ActivityTypeEnum.matchedExternalActivity,
    activityStatusEnumId: ActivityStatusEnum.Approved,
    professorApproval: ActivityProfessorApprovalEnum.Approved,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-09-15"),
        endTerm: new Date("2024-10-15"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-09-15"),
  },
  {
    id: 18,
    name: "서버리스 아키텍처 구현",
    activityTypeEnumId: ActivityTypeEnum.notMatchedActivity,
    activityStatusEnumId: ActivityStatusEnum.Applied,
    professorApproval: ActivityProfessorApprovalEnum.Requested,
    location: "N1 세미나실",
    purpose: "AI 학습 및 연구",
    detail: "최신 AI 기술 학습 및 실습",
    evidence: "발표자료, 실습 결과물",
    participants: [
      { id: 1, name: "김태희", studentNumber: 20240001 },
      { id: 2, name: "정우성", studentNumber: 20240002 },
      { id: 3, name: "손예진", studentNumber: 20240003 },
    ],
    durations: [
      {
        startTerm: new Date("2024-08-15"),
        endTerm: new Date("2024-11-15"),
      },
    ],
    evidenceFiles: [],
    professorApprovedAt: new Date("2024-08-15"),
  },
];
