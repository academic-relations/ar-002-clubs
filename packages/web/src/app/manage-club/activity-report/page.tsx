"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { UserTypeEnum } from "@sparcs-clubs/interface/common/enum/user.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import LoginRequired from "@sparcs-clubs/web/common/frames/LoginRequired";
import NoManageClub from "@sparcs-clubs/web/common/frames/NoManageClub";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import ActivityReportMainFrame from "@sparcs-clubs/web/features/activity-report/frames/ActivityReportMainFrame";
import { useGetMyManageClub } from "@sparcs-clubs/web/features/manage-club/services/getMyManageClub";

const ActivityReport = () => {
  const { isLoggedIn, login, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  if (profile?.type === UserTypeEnum.Professor) {
    router.replace("/manage-club");
  }
  if (profile?.type !== UserTypeEnum.Undergraduate) {
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
