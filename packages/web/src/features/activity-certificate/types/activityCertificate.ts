export const stringToDate = (dateString: string) => new Date(dateString);

export const dateToString = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

export interface ActivityBasicInfo {
  clubId: number;
  activityDuration: string;
  issuedNumber: number;
  applicantName: string;
  applicantDepartment: string;
  applicantStudentNumber: number;
  applicantPhoneNumber: string;
}

export interface ActivityHistory {
  key: number;
  dateRange: [Date | null, Date | null];
  description: string;
}

export interface ActivityCertificateInfo extends ActivityBasicInfo {
  isAgreed: boolean;
  histories: ActivityHistory[];
}
