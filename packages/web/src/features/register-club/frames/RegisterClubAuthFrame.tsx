import React, { useMemo } from "react";

import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import HasClubRegistration from "@sparcs-clubs/web/common/frames/HasClubRegistration";
import NoManageClub from "@sparcs-clubs/web/common/frames/NoManageClub";
import NotRegistrationPeriod from "@sparcs-clubs/web/common/frames/NotClubRegistrationPeriod";
import { useGetMyClubRegistration } from "@sparcs-clubs/web/features/my/services/getMyClubRegistration";
import RegisterClubMainFrame from "@sparcs-clubs/web/features/register-club/frames/RegisterClubMainFrame";
import { useCheckManageClub } from "@sparcs-clubs/web/hooks/checkManageClub";

import useGetClubRegistrationPeriod from "../hooks/useGetClubRegistrationPeriod";

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
    data: deadlineData,
    isLoading: isLoadingDeadline,
    isError: isErrorDeadline,
  } = useGetClubRegistrationPeriod();

  const hasMyClubRegistration = useMemo<boolean>(
    () =>
      myClubRegistrationData
        ? myClubRegistrationData.registrations.length > 0
        : false,
    [myClubRegistrationData],
  );

  if (isLoading || checkLoading || isLoadingDeadline) {
    return (
      <AsyncBoundary
        isLoading={isLoading || checkLoading || isLoadingDeadline}
        isError={isError || isErrorDeadline}
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

  if (!deadlineData.isClubRegistrationPeriod) {
    return <NotRegistrationPeriod />;
  }

  return <RegisterClubMainFrame type={type} deadline={deadlineData.deadline} />;
};

export default RegisterClubAuthFrame;
