import React from "react";

import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import NoManageClub from "@sparcs-clubs/web/common/frames/NoManageClub";
import RegisterClubMainFrame from "@sparcs-clubs/web/features/register-club/frames/RegisterClubMainFrame";
import { useCheckManageClub } from "@sparcs-clubs/web/hooks/checkManageClub";

const RegisterClubAuthFrame: React.FC<{
  type: RegistrationTypeEnum;
}> = ({ type }) => {
  const { delegate, isLoading } = useCheckManageClub();

  if (isLoading) {
    return <AsyncBoundary isLoading={isLoading} isError />;
  }

  if (delegate === undefined) {
    return <NoManageClub />;
  }
  return <RegisterClubMainFrame type={type} />;
};

export default RegisterClubAuthFrame;
