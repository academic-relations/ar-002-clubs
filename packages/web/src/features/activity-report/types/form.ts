import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import { FileDetail } from "@sparcs-clubs/web/common/components/File/attachment";

type Duration = {
  startTerm: Date;
  endTerm: Date;
};

type Participant = {
  id: number;
  studentNumber: number;
  name: string;
};

export interface ActivityReportFormData {
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
