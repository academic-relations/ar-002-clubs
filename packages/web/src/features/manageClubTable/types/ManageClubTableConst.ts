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
