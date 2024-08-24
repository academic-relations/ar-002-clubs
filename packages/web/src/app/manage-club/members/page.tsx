"use client";

import React, { useEffect, useState } from "react";

import { RegistrationDeadlineEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import LoginRequired from "@sparcs-clubs/web/common/frames/LoginRequired";
import NoManageClub from "@sparcs-clubs/web/common/frames/NoManageClub";
import NotRegistrationPeriod from "@sparcs-clubs/web/common/frames/NotRegistrationPeriod";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import { useGetRegistrationTerm } from "@sparcs-clubs/web/features/clubs/services/useGetRegistrationTerm";
import ManageClubMembers from "@sparcs-clubs/web/features/manage-club/members/frames/ManageClubMembersFrame";

const Members = () => {
  const { isLoggedIn, login, profile } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn !== undefined || profile !== undefined) {
      setLoading(false);
    }
  }, [isLoggedIn, profile]);

  const { data, isLoading, isError } = useGetRegistrationTerm();
  const [isRegistrationPeriod, setIsRegistrationPeriod] =
    useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const now = new Date();
      const currentEvents = data.events.filter(
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
  }, [data]);

  if (loading || isLoading) {
    return <AsyncBoundary isLoading={loading || isLoading} isError={isError} />;
  }

  if (!isRegistrationPeriod) {
    return <NotRegistrationPeriod />;
  }

  if (!isLoggedIn) {
    return <LoginRequired login={login} />;
  }

  if (profile !== "undergraduate") {
    return <NoManageClub />;
  }

  return <ManageClubMembers />;
};

export default Members;
