export interface ActivityBasicInfo {
  clubId: number;
  activityDuration: { startMonth: Date; endMonth: Date | undefined }[];
  issuedNumber: number;
  applicantName: string;
  applicantDepartment: string;
  applicantStudentNumber: string;
  applicantPhoneNumber: string;
}

export interface ActivityHistory {
  dateRange: [Date | null, Date | null];
  description: string;
}

export interface ActivityCertificateInfo extends ActivityBasicInfo {
  isAgreed: boolean;
  histories: ActivityHistory[];
}
