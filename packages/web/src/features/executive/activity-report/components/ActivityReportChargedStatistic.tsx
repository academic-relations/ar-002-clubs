import React from "react";

import { IActivitySummaryExecutiveResponse } from "@sparcs-clubs/interface/api/activity/type/activity.type";
import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import ActivityReportStatisticContent from "./_atomic/ActivityReportStatisticContent";

const ActivityReportChargedStatistic: React.FC<{
  activities: IActivitySummaryExecutiveResponse[];
}> = ({ activities }) => {
  const pendingTotalCount = activities.filter(
    activity => activity.activityStatusEnum === ActivityStatusEnum.Applied,
  ).length;
  const approvedTotalCount = activities.filter(
    activity => activity.activityStatusEnum === ActivityStatusEnum.Approved,
  ).length;
  const rejectedTotalCount = activities.filter(
    activity => activity.activityStatusEnum === ActivityStatusEnum.Rejected,
  ).length;

  return (
    <ActivityReportStatisticContent
      pendingTotalCount={pendingTotalCount}
      approvedTotalCount={approvedTotalCount}
      rejectedTotalCount={rejectedTotalCount}
    />
  );
};

export default ActivityReportChargedStatistic;
