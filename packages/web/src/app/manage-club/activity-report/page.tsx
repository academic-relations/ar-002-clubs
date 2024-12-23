"use client";

import React, { useEffect, useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import LoginRequired from "@sparcs-clubs/web/common/frames/LoginRequired";
import NoManageClub from "@sparcs-clubs/web/common/frames/NoManageClub";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import ActivityReportMainFrame from "@sparcs-clubs/web/features/manage-club/activity-report/frames/ActivityReportMainFrame";
import { useGetMyManageClub } from "@sparcs-clubs/web/features/manage-club/services/getMyManageClub";

const ActivityReport = () => {
  const { isLoggedIn, login, profile } = useAuth();
  const [loading, setLoading] = useState(true);

  const { data, isLoading, isError } = useGetMyManageClub();

  useEffect(() => {
    if (isLoggedIn !== undefined || profile !== undefined) {
      setLoading(false);
    }
  }, [isLoggedIn, profile]);

  if (loading) {
    return <AsyncBoundary isLoading={loading} isError />;
  }

  if (!isLoggedIn) {
    return <LoginRequired login={login} />;
  }

  if (profile?.type !== "undergraduate") {
    return <NoManageClub />;
  }

  if (!data || !("clubId" in data)) {
    return <AsyncBoundary isLoading={isLoading} isError={isError} />;
  }

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <ActivityReportMainFrame clubId={data.clubId} />
    </AsyncBoundary>
  );
};

export default ActivityReport;
