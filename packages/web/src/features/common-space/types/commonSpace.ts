export interface CommonSpaceInterface {
  agreement: boolean;
  info?: {
    clubName: string;
    applicant: string;
    phone: string;
  };
  space?: string;
  reservation?: {
    start: Date;
    end: Date;
  };
}
