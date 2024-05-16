export interface PastActivityReport {
  activity: string;
  category: string;
  startDate: Date;
  endDate: Date;
}

export interface NewActivityReport extends PastActivityReport {
  status: string;
}

export type Participant = {
  studentId: string;
  name: string;
  phoneNumber: string;
  email: string;
};
