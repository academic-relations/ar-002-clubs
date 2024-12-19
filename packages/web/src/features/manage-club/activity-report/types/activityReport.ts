import {
  ActivityStatusEnum,
  ActivityTypeEnum,
} from "@sparcs-clubs/interface/common/enum/activity.enum";

export interface PastActivityReport {
  id: number;
  activityTypeEnumId: ActivityTypeEnum;
  name: string;
  startTerm: Date;
  endTerm: Date;
}

export interface NewActivityReport extends PastActivityReport {
  activityStatusEnumId: ActivityStatusEnum;
  professorApproval?: string;
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
