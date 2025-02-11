"use client";

import React, { useEffect, useState } from "react";

import { UserTypeEnum } from "@sparcs-clubs/interface/common/enum/user.enum";

import Custom404 from "@sparcs-clubs/web/app/not-found";
import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import LoginRequired from "@sparcs-clubs/web/common/frames/LoginRequired";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import ExecutiveRegisterMemberDetail from "@sparcs-clubs/web/features/executive/register-member/frames/ExecutiveRegisterMemberDetailFrame";

/** NOTE: (@dora) 등록 기간 무관하게 항상 볼 수 있는 화면 */
const RegisterMember = () => {
  const { isLoggedIn, login, profile } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn !== undefined || profile !== undefined) {
      setLoading(false);
    }
  }, [isLoggedIn, profile]);

  if (loading) {
    return <AsyncBoundary isLoading={loading} isError={false} />;
  }

  if (!isLoggedIn) {
    return <LoginRequired login={login} />;
  }

  if (profile?.type !== UserTypeEnum.Executive) {
    return <Custom404 />;
  }

  return <ExecutiveRegisterMemberDetail />;
};

export default RegisterMember;
