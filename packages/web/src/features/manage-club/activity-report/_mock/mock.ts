import { Participant } from "../types/activityReport";

export const mockNewActivityData = [
  {
    status: "신청",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 내부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    status: "신청 완료",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 내부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    status: "신청 완료",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 외부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    status: "신청 반려",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 외부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    status: "승인 완료",
    activity: "개발개발한 어떠한 활동",
    category: "동아리 성격에 합치하는 내부 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    status: "승인 완료",
    activity: "2024년도 봄의기 MT",
    category: "동아리 성격에 합치하지 않는 활동",
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
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
