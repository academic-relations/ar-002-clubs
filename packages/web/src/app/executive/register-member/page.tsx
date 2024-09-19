"use client";

import React, { useEffect, useState } from "react";

import { RegistrationDeadlineEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import Custom404 from "@sparcs-clubs/web/app/not-found";
import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import LoginRequired from "@sparcs-clubs/web/common/frames/LoginRequired";

import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";

import { useGetRegistrationTerm } from "@sparcs-clubs/web/features/clubs/services/useGetRegistrationTerm";

import { ExecutiveRegisterMember } from "@sparcs-clubs/web/features/executive/register-member/frames/ExecutiveRegisterMemberFrame";

const RegisterMember = () => {
  const { isLoggedIn, login, profile } = useAuth();
  const [loading, setLoading] = useState(true);

  const {
    data: termData,
    isLoading: isLoadingTerm,
    isError: isErrorTerm,
  } = useGetRegistrationTerm();

  const [isRegistrationPeriod, setIsRegistrationPeriod] = useState<boolean>();
  // useEffect(() => {
  // setIsRegistrationPeriod(false);
  // }, []);

  useEffect(() => {
    if (termData) {
      const now = new Date();
      const currentEvents = termData.events.filter(
        event => now >= event.startTerm && now <= event.endTerm,
      );
      if (currentEvents.length === 0) {
        setIsRegistrationPeriod(false);
        return;
      }
      const registrationEvent = currentEvents.filter(
        event =>
          event.registrationEventEnumId ===
          RegistrationDeadlineEnum.StudentRegistrationApplication,
      );
      if (registrationEvent.length > 0) {
        setIsRegistrationPeriod(true);
      } else {
        setIsRegistrationPeriod(false);
      }
    }
  }, [termData]);

  useEffect(() => {
    if (isLoggedIn !== undefined || profile !== undefined) {
      setLoading(false);
    }
  }, [isLoggedIn, profile]);

  if (loading || isLoadingTerm) {
    return (
      <AsyncBoundary
        isLoading={loading || isLoadingTerm}
        isError={isErrorTerm}
      />
    );
  }

  if (!isLoggedIn) {
    return <LoginRequired login={login} />;
  }

  if (profile?.type !== "executive") {
    return <Custom404 />;
  }

  if (!isRegistrationPeriod) {
    return <Custom404 />;
  }

  return (
    <FlexWrapper direction="column" gap={20}>
      <PageHead
        items={[
          { name: "집행부원 대시보드", path: "/executive" },
          { name: "회원 등록 신청 내역", path: `/executive/register-member` },
        ]}
        title="회원 등록 신청 내역"
      />
      <ExecutiveRegisterMember />
    </FlexWrapper>
  );
};

export default RegisterMember;
