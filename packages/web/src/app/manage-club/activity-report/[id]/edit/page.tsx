"use client";

import React from "react";

import ActivityReportEditFrame from "@sparcs-clubs/web/features/manage-club/activity-report/frames/ActivityReportEditFrame";

const ActivityReport = ({ params }: { params: { id: string } }) => (
  <ActivityReportEditFrame id={params.id} />
);

export default ActivityReport;
