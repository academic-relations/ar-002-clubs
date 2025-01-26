import { ApiAct018ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct018";
import { ActivityDeadlineEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";
import { getDate, getMonth, getYear } from "date-fns";

export const MAX_ACTIVITY_REPORT_COUNT = 20;

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

export const newActivityReportListSectionInfoText = (
  data?: ApiAct018ResponseOk,
) => {
  const status = activityDeadlineEnumToString(
    data?.deadline.activityDeadlineEnum,
  );
  const endTerm = data?.deadline.duration.endTerm;
  return `현재는 ${data?.targetTerm.year}년 ${data?.targetTerm.name}학기 활동 보고서 ${status} 기간입니다 (${status} 마감 : ${endTerm ? `${getYear(endTerm)}년 ${getMonth(endTerm) + 1}월 ${getDate(endTerm)}일 23:59` : "-"})`;
};
