import React, { useEffect, useMemo, useState } from "react";

import {
  RegistrationDeadlineEnum,
  RegistrationTypeEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import HasClubRegistration from "@sparcs-clubs/web/common/frames/HasClubRegistration";
import NoManageClub from "@sparcs-clubs/web/common/frames/NoManageClub";
import { useGetRegistrationTerm } from "@sparcs-clubs/web/features/clubs/services/useGetRegistrationTerm";
import { useGetMyClubRegistration } from "@sparcs-clubs/web/features/my/services/getMyClubRegistration";
import RegisterClubMainFrame from "@sparcs-clubs/web/features/register-club/frames/RegisterClubMainFrame";
import { useCheckManageClub } from "@sparcs-clubs/web/hooks/checkManageClub";

const RegisterClubAuthFrame: React.FC<{
  type: RegistrationTypeEnum;
}> = ({ type }) => {
  const { delegate, isLoading: checkLoading } = useCheckManageClub();

  const {
    data: myClubRegistrationData,
    isLoading,
    isError,
  } = useGetMyClubRegistration();

  const {
    data: termData,
    isLoading: isLoadingTerm,
    isError: isErrorTerm,
  } = useGetRegistrationTerm();

  const [clubRegistrationPeriodEnd, setClubRegistrationPeriodEnd] =
    useState<Date | null>(null);

  const hasMyClubRegistration = useMemo<boolean>(
    () =>
      myClubRegistrationData
        ? myClubRegistrationData.registrations.length > 0
        : false,
    [myClubRegistrationData],
  );

  useEffect(() => {
    if (termData) {
      const now = new Date();
      const currentEvents = termData.events.filter(
        event => now >= event.startTerm && now <= event.endTerm,
      );
      if (currentEvents.length === 0) return;

      const registrationEvent = currentEvents.filter(
        event =>
          event.registrationEventEnumId ===
          RegistrationDeadlineEnum.ClubRegistrationApplication,
      );
      if (registrationEvent.length > 0) {
        setClubRegistrationPeriodEnd(registrationEvent[0].endTerm);
      }
    }
  }, [termData]);

  if (isLoading || checkLoading || isLoadingTerm) {
    return (
      <AsyncBoundary
        isLoading={isLoading || checkLoading || isLoadingTerm}
        isError={isError || isErrorTerm}
      />
    );
  }

  if (delegate === undefined && type !== RegistrationTypeEnum.NewProvisional) {
    return <NoManageClub />;
  }

  if (hasMyClubRegistration) {
    return (
      <HasClubRegistration
        applyId={myClubRegistrationData!.registrations[0].id}
      />
    );
  }

  return (
    <RegisterClubMainFrame type={type} deadline={clubRegistrationPeriodEnd} />
  );
};

export default RegisterClubAuthFrame;
