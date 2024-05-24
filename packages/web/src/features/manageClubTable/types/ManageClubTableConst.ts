import { ManageClubTagColorsInterface } from "./ManageClubTable";

export const ManageClubTagColors: ManageClubTagColorsInterface = {
  submit: "BLUE",
  cancel: "GRAY",
  approve: "ORANGE",
  rent: "PURPLE",
  return: "GREEN",
  print: "PURPLE",
  receive: "GREEN",
  issue: "GREEN",
  reject: "RED",
  use: "GREEN",
};

export const dateAndTimeFormatKeys = ["submitTime", "receiveTime"];
export const dateFormatKeys = ["rentTime", "returnTime", "reserveTime"];
export const startEndTimeFormatKeys = ["reserveStartEndHour"];
export const numberFormatKeys = ["issueNumber"];

export const rentalBusinessStepOrder = ["신청", "취소", "승인", "대여", "반납"];
export const printingBusinessStepOrder = [
  "신청",
  "취소",
  "승인",
  "출력",
  "수령",
];
export const activityCertificateStepOrder = [
  "신청",
  "취소",
  "승인",
  "발급",
  "반려",
];
export const commonSpaceStepOrder = ["신청", "취소", "사용"];

export const formattedString = (
  key: string,
  value: Date | number | string,
): string => {
  if (value === undefined) {
    return "-";
  }

  const days = "일월화수목금토";

  if (dateAndTimeFormatKeys.includes(key)) {
    return `${(value as Date).getFullYear()}년 ${(value as Date).getMonth() + 1}월 ${(value as Date).getDate()}일 (${days[(value as Date).getDay()]}) ${(value as Date).getHours().toString().padStart(2, "0")}:${(value as Date).getMinutes().toString().padStart(2, "0")}`;
  }
  if (dateFormatKeys.includes(key)) {
    return `${(value as Date).getFullYear()}년 ${(value as Date).getMonth() + 1}월 ${(value as Date).getDate()}일 (${days[(value as Date).getDay()]})`;
  }
  if (startEndTimeFormatKeys.includes(key)) {
    return value as string;
  }
  if (numberFormatKeys.includes(key)) {
    return `${value}매`;
  }

  return value as string;
};
