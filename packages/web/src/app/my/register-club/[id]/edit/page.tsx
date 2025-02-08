"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import LoginRequired from "@sparcs-clubs/web/common/frames/LoginRequired";
import NotForExecutive from "@sparcs-clubs/web/common/frames/NotForExecutive";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import MyRegisterClubEditFrame from "@sparcs-clubs/web/features/my/register-club/frames/MyRegisterClubEditFrame";

const MyRegisterClubEdit = () => {
  const { isLoggedIn, login, profile } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn !== undefined || profile !== undefined) {
      setLoading(false);
    }
  }, [isLoggedIn, profile]);
  const { id: applyId } = useParams();

  if (loading) {
    return <AsyncBoundary isLoading={loading} isError />;
  }

  if (!isLoggedIn) {
    return <LoginRequired login={login} />;
  }

  if (profile?.type === "executive") {
    return <NotForExecutive />;
  }

  return <MyRegisterClubEditFrame applyId={+applyId} />;
};
export default MyRegisterClubEdit;
