import {
  ActivityStatusEnum,
  ActivityTypeEnum,
} from "@sparcs-clubs/interface/common/enum/activity.enum";

import { FileDetail } from "@sparcs-clubs/web/common/components/File/attachment";

import { Participant } from "@sparcs-clubs/web/types/participant";

type Duration = {
  startTerm: Date;
  endTerm: Date;
};

export interface BaseActivityReport {
  name: string;
  activityTypeEnumId: ActivityTypeEnum;
  durations: Duration[];
  location: string;
  purpose: string;
  detail: string;
  evidence: string;
  evidenceFiles: FileDetail[];
  participants: Participant[];
}

export interface PastActivityReport extends BaseActivityReport {
  id: number;
  activityTypeEnumId: ActivityTypeEnum;
  name: string;
  startTerm: Date;
  endTerm: Date;
}

export interface NewActivityReport extends PastActivityReport {
  activityStatusEnumId: ActivityStatusEnum;
  professorApproval?: string;
  professorApprovedAt?: Date;
}

export interface ActivityTerm {
  id: number;
  name: string;
  startTerm: Date;
  endTerm: Date;
  year: number;
}
