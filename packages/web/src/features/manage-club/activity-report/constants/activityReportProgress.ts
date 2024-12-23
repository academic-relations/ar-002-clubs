import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import { StatusAndDate } from "@sparcs-clubs/web/common/components/ProgressCheckSection";
import { ProgressCheckSectionStatusEnum } from "@sparcs-clubs/web/common/components/ProgressCheckSection/progressCheckStationStatus";

interface ActivityReportProgressDetail {
  labels: string[];
  progress: StatusAndDate[];
}

const getActivityReportProgress = (
  status: ActivityStatusEnum,
  date: Date,
): ActivityReportProgressDetail => {
  switch (status) {
    case ActivityStatusEnum.Applied:
      return {
        labels: ["신청 완료", "승인 대기"],
        progress: [{ status: ProgressCheckSectionStatusEnum.Approved, date }],
      };
    case ActivityStatusEnum.Approved:
      return {
        labels: ["신청 완료", "동아리 연합회 승인 완료"],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: undefined },
          { status: ProgressCheckSectionStatusEnum.Approved, date },
        ],
      };
    case ActivityStatusEnum.Rejected:
      return {
        labels: ["신청 완료", "동아리 연합회 신청 반려"],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: undefined },
          { status: ProgressCheckSectionStatusEnum.Canceled, date },
        ],
      };
    default:
      throw new Error("Invalid activity report status");
  }
};

export { getActivityReportProgress };
