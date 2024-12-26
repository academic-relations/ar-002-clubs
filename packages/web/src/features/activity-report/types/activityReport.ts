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

export interface ActivityTerm {
  id: number;
  name: string;
  startTerm: Date;
  endTerm: Date;
  year: number;
}
