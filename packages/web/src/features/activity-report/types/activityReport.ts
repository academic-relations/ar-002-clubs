import {
  ActivityStatusEnum,
  ActivityTypeEnum,
} from "@sparcs-clubs/interface/common/enum/activity.enum";

import { FileDetail } from "@sparcs-clubs/web/common/components/File/attachment";

import { Participant } from "@sparcs-clubs/web/types/participant";
import ProfessorApprovalEnum from "@sparcs-clubs/web/types/professorApproval";

type Duration = {
  startTerm: Date;
  endTerm: Date;
};

type Comment = {
  content: string;
  createdAt: Date;
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

export interface CurrentActivityReport extends BaseActivityReport {
  id: number;
  updatedAt: Date;
  activityStatusEnumId: ActivityStatusEnum;
  professorApproval: ProfessorApprovalEnum | null;
  professorApprovedAt?: Date;
  comments: Comment[];
}
