export type ActivityDescription = {
  key: number;
  startMonth: string;
  endMonth: string;
  description: string;
};

export interface ActivityCertificateInterface {
  clubId: number | null;
  applicant: string | null;
  department: string | null;
  studentNumber: number | null;
  krPhoneNumber: string;
  issuedNumber: number | null;
  startMonth: string;
  endMonth: string;
  detail: Array<ActivityDescription>;
}

export interface ActivityCertificateProgress {
  agreement: boolean;
  firstFilled: boolean;
  firstNoError: boolean;
  secondFilled: boolean;
  secondNoError: boolean;
}

export interface FirstErrorStatus {
  hasClubIdError: boolean;
  hasIssuedNumberError: boolean;
  hasKrPhoneNumberError: boolean;
}
export interface SecondErrorStatus {
  key: number;
  hasStartEndMonthError: boolean;
  hasDescriptionError: boolean;
}
