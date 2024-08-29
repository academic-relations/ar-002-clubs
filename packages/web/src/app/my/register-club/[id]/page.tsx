"use client";

import React, { useEffect, useState } from "react";

import NotFound from "@sparcs-clubs/web/app/not-found";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import LoginRequired from "@sparcs-clubs/web/common/frames/LoginRequired";
import NotForExecutive from "@sparcs-clubs/web/common/frames/NotForExecutive";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import MyRegisterClubDetailFrame from "@sparcs-clubs/web/features/my/register-club/frames/MyRegisterClubDetailFrame";

const MyRegisterClubDetail = () => {
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

  if (!isLoggedIn) {
    return <LoginRequired login={login} />;
  }

  if (profile === "executive") {
    return <NotForExecutive />;
  }

  if (!profile) {
    return <NotFound />;
  }

  return <MyRegisterClubDetailFrame profile={profile} />;
};
export default MyRegisterClubDetail;
