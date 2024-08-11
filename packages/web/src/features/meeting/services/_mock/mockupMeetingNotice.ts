import { MeetingNoticeTypeEnum } from "@sparcs-clubs/web/features/meeting/components/MeetingNoticeItem";

const mockUpMeetingNotice = {
  items: [
    {
      id: 1,
      tag: MeetingNoticeTypeEnum.Notice,
      title: "2024년 제11차 운영위원회 (8월, 임시회)",
      date: new Date("2024-07-22"),
    },
    {
      id: 2,
      tag: MeetingNoticeTypeEnum.Notice,
      title: "2024년 제4차 확대운영위원회 (7월, 임시회)",
      date: new Date("2024-07-20"),
    },
    {
      id: 3,
      tag: MeetingNoticeTypeEnum.Notice,
      title: "6월 분과회의 기간 공고",
      date: new Date("2024-06-15"),
    },
    {
      id: 4,
      tag: MeetingNoticeTypeEnum.Agenda,
      title: "6월 분과회의 안건지",
      date: new Date("2024-06-20"),
    },
    {
      id: 5,
      tag: MeetingNoticeTypeEnum.Meeting,
      title: "6월 밴드음악분과 정기회의 회의록",
      date: new Date("2024-06-23"),
    },
    {
      id: 6,
      tag: MeetingNoticeTypeEnum.Meeting,
      title: "6월 생활체육분과 정기회의 회의록",
      date: new Date("2024-06-23"),
    },
    {
      id: 7,
      tag: MeetingNoticeTypeEnum.Meeting,
      title: "6월 연행예술분과 정기회의 회의록",
      date: new Date("2024-06-23"),
    },
    {
      id: 8,
      tag: MeetingNoticeTypeEnum.Notice,
      title: "2024년 제3차 확대운영위원회 (5월, 정기회)",
      date: new Date("2024-05-24"),
    },
    {
      id: 9,
      tag: MeetingNoticeTypeEnum.Agenda,
      title: "2024년 제3차 확대운영위원회 (5월, 정기회)",
      date: new Date("2024-05-28"),
    },
    {
      id: 10,
      tag: MeetingNoticeTypeEnum.Meeting,
      title: "2024년 제3차 확대운영위원회 (5월, 정기회)",
      date: new Date("2024-05-30"),
    },
    {
      id: 11,
      tag: MeetingNoticeTypeEnum.Notice,
      title: "(For Everyone) 2024년 제1차 전체동아리대표자회의 (3월, 정기회)",
      date: new Date("2024-03-13"),
    },
    {
      id: 12,
      tag: MeetingNoticeTypeEnum.Agenda,
      title: "(For Everyone) 2024년 제1차 전체동아리대표자회의 (3월, 정기회)",
      date: new Date("2024-03-18"),
    },
  ],
  total: 12,
  offset: 12,
};

export default mockUpMeetingNotice;
