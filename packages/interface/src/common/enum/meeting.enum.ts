export enum MeetingEnum {
  clubRepresentativesCouncilMeeting = 1, // 전동대회
  expansiveOperativeCommittee, // 확대운영위원회
  operativeCommittee, // 운영위원회
  divisionMeeting, // 분과회의
}

export enum MeetingStatusEnum {
  Announcement = 1, // 공고 게시
  Agenda, // 안건 공개
  Complete, // 회의 종료
}

export enum MeetingAgendaEntityTypeEnum {
  Content = 1, // Mapping Table에서 Content가 mapping된 경우
  Vote, // Mapping Table에서 Vote mapping된 경우
  AgendaOnly, // Mapping Table에서 Agenda까지만 mapping된 경우
}
