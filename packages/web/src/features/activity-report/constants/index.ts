import { ActivityDeadlineEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";
import { getDate, getMonth, getYear } from "date-fns";

export const MAX_ACTIVITY_REPORT_COUNT = 20;

export const newActivityReportListSectionInfoText = (
  semester: string,
  status: string,
  deadline?: Date,
) =>
  `현재는 ${semester}학기 활동 보고서 ${status} 기간입니다 (${status} 마감 : ${deadline ? `${getYear(deadline)}년 ${getMonth(deadline) + 1}월 ${getDate(deadline)}일 23:59` : "-"})`;

export const activityDeadlineEnumToString = (
  deadline?: ActivityDeadlineEnum,
) => {
  switch (deadline) {
    case ActivityDeadlineEnum.Activity:
      return "활동";
    case ActivityDeadlineEnum.Upload:
      return "작성";
    case ActivityDeadlineEnum.Modification:
      return "수정";
    default:
      return "예외";
  }
};
