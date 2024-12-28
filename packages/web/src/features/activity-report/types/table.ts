import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import ProfessorApprovalEnum from "@sparcs-clubs/web/types/professorApproval";

import { BaseActivityReport } from "./activityReport";

export interface ProfessorActivityReportTableData
  extends Pick<
    BaseActivityReport,
    "name" | "activityTypeEnumId" | "durations"
  > {
  id: number;
  activityStatusEnumId: ActivityStatusEnum;
  professorApproval: ProfessorApprovalEnum;
}
