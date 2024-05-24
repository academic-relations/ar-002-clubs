import { TagColor } from "@sparcs-clubs/web/common/components/Tag";

export type ServiceType =
  | "rental-business"
  | "printing-business"
  | "activity-certificate"
  | "common-space";

export enum ManageClubRentalBusinessStatus {
  submit = "신청",
  cancel = "취소",
  approve = "승인",
  rent = "대여",
  return = "반납",
}

export interface ManageClubRentalBusinessData {
  status: ManageClubRentalBusinessStatus;
  submitTime: Date;
  name: string;
  phoneNumber: string;
  rentTime: Date;
  returnTime: Date;
  rentProducts: string;
}

export enum ManageClubPrintingBusinessStatus {
  submit = "신청",
  cancel = "취소",
  approve = "승인",
  print = "출력",
  receive = "수령",
}

export interface ManageClubPrintingBusinessData {
  status: ManageClubPrintingBusinessStatus;
  submitTime: Date;
  name: string;
  phoneNumber: string;
  receiveTime: Date;
  printNumber: string;
}

export enum ManageClubActivityCertificateStatus {
  submit = "신청",
  cancel = "취소",
  approve = "승인",
  issue = "발급",
  reject = "반려",
}

export interface ManageClubActivityCertificateData {
  status: ManageClubActivityCertificateStatus;
  submitTime: Date;
  name: string;
  phoneNumber: string;
  issueNumber: number;
  note: string;
}

export enum ManageClubCommonSpaceStatus {
  submit = "신청",
  cancel = "취소",
  use = "사용",
}

export interface ManageClubCommonSpaceData {
  status: ManageClubCommonSpaceStatus;
  submitTime: Date;
  name: string;
  phoneNumber: string;
  reserveTime: Date;
  reserveStartEndHour: string;
  reserveRoom: string;
}

export interface ManageClubTagColorsInterface {
  submit: TagColor;
  cancel: TagColor;
  approve: TagColor;
  rent: TagColor;
  return: TagColor;
  print: TagColor;
  receive: TagColor;
  issue: TagColor;
  reject: TagColor;
  use: TagColor;
}
