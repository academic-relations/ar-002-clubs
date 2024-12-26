import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import { FileDetail } from "@sparcs-clubs/web/common/components/File/attachment";

import { Participant } from "@sparcs-clubs/web/types/participant";

type Duration = {
  startTerm: Date;
  endTerm: Date;
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
