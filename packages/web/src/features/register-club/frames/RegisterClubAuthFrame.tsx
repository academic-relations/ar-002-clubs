import React, { useMemo } from "react";

import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import HasClubRegistration from "@sparcs-clubs/web/common/frames/HasClubRegistration";
import NoManageClub from "@sparcs-clubs/web/common/frames/NoManageClub";
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

  const hasMyClubRegistration = useMemo<boolean>(
    () =>
      myClubRegistrationData
        ? myClubRegistrationData.registrations.length > 0
        : false,
    [myClubRegistrationData],
  );

  if (isLoading || checkLoading) {
    return (
      <AsyncBoundary isLoading={isLoading || checkLoading} isError={isError} />
    );
  }

  if (
    delegate === undefined &&
    type !== RegistrationTypeEnum.ReProvisional &&
    type !== RegistrationTypeEnum.NewProvisional
  ) {
    return <NoManageClub />;
  }

  if (hasMyClubRegistration) {
    return (
      myClubRegistrationData && (
        <HasClubRegistration
          applyId={myClubRegistrationData?.registrations[0].id}
        />
      )
    );
  }

  return <RegisterClubMainFrame type={type} />;
};

export default RegisterClubAuthFrame;
