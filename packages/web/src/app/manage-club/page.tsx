"use client";

import React, { useEffect, useState } from "react";

import { UserTypeEnum } from "@sparcs-clubs/interface/common/enum/user.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import LoginRequired from "@sparcs-clubs/web/common/frames/LoginRequired";
import NoManageClub from "@sparcs-clubs/web/common/frames/NoManageClub";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import ManageClubFrame from "@sparcs-clubs/web/features/manage-club/frames/ManageClubFrame";
import ProfessorManageClubFrame from "@sparcs-clubs/web/features/manage-club/frames/ProfessorManageClubFrame";

const ManageClub: React.FC = () => {
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

  if (profile?.type === UserTypeEnum.Professor) {
    return <ProfessorManageClubFrame />;
  }

  if (profile?.type !== UserTypeEnum.Undergraduate) {
    return <NoManageClub />;
  }

  return <ManageClubFrame />;
};

export default ManageClub;
