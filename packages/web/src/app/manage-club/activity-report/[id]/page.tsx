"use client";

import React, { useEffect, useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

import LoginRequired from "@sparcs-clubs/web/common/frames/LoginRequired";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";

import ActivityReportDetailFrame from "@sparcs-clubs/web/features/activity-report/frames/ActivityReportDetailFrame";

const ActivityReportDetail = () => {
  const { isLoggedIn, login, profile } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn !== undefined || profile !== undefined) {
      setLoading(false);
    }
  }, [isLoggedIn, profile]);

  if (loading) {
    return <AsyncBoundary isLoading={loading} isError />;
  }

  if (!isLoggedIn || !profile) {
    return <LoginRequired login={login} />;
  }

  return <ActivityReportDetailFrame profile={profile} />;
};

export default ActivityReportDetail;
