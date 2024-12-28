import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import { ActivityProfessorApprovalEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

import { BaseActivityReport } from "./activityReport";

export interface ProfessorActivityReportTableData
  extends Pick<
    BaseActivityReport,
    "name" | "activityTypeEnumId" | "durations"
  > {
  id: number;
  activityStatusEnumId: ActivityStatusEnum;
  professorApproval: ActivityProfessorApprovalEnum;
}
