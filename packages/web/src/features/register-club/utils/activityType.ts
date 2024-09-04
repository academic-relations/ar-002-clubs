import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import { TagColor } from "@sparcs-clubs/web/common/components/Tag";

export const getActivityTypeTagColor = (
  activityType: ActivityTypeEnum,
): TagColor => {
  switch (activityType) {
    case ActivityTypeEnum.matchedInternalActivity:
      return "ORANGE";
    case ActivityTypeEnum.matchedExternalActivity:
      return "BLUE";
    case ActivityTypeEnum.notMatchedActivity:
      return "PURPLE";
    default:
      return "GRAY";
  }
};

export const getActivityTypeTagLabel = (
  activityType: ActivityTypeEnum,
): string => {
  switch (activityType) {
    case ActivityTypeEnum.matchedInternalActivity:
      return "동아리 성격에 합치하는 내부 활동";
    case ActivityTypeEnum.matchedExternalActivity:
      return "동아리 성격에 합치하는 외부 활동";
    case ActivityTypeEnum.notMatchedActivity:
      return "동아리 성격에 합치하지 않는 활동";
    default:
      return "-";
  }
};
