import { TagColor } from "@sparcs-clubs/web/common/components/Tag";

export type ServiceType =
  | "rental-business"
  | "printing-business"
  | "activity-certificate"
  | "common-space"
  | "storage";

export enum ManageClubRentalBusinessStatus {
  submit = "신청",
  cancel = "취소",
  approve = "승인",
  rent = "대여",
  return = "반납",
  overdue = "연체",
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

export enum ManageClubStorageStatus {
  submit = "신청",
  cancel = "취소",
  approve = "승인",
  reject = "반려",
  receive = "보관",
  shipp = "반출",
  overdue = "연체",
}

export interface ManageClubStorageData {
  status: ManageClubStorageStatus;
  createdAt: Date;
  name: string;
  studentPhoneNumber: string;
  desiredStartDate: Date;
  desiredEndDate: Date;
  numberOfNonStandardItems: number;
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
  overdue: TagColor;
  shipp: TagColor;
}
