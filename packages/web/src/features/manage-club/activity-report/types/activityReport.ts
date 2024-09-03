export interface PastActivityReport {
  activity: string;
  category: string;
  startDate: Date;
  endDate: Date;
}

export interface NewActivityReport extends PastActivityReport {
  status: string;
  professorApproval: string;
}

export interface Participant {
  id: number;
  studentNumber: number;
  name: string;
  // phoneNumber: string;
  // email: string;
}

export interface ActivityReport {
  name: string;
  category: string;
  dateRange: string;
  location: string;
  goal: string;
  description: string;
  participants: Participant[];
  proof: string;
}
