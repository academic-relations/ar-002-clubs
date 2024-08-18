"use client";

import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";

import RegisterClubMainFrame from "@sparcs-clubs/web/features/register-club/frames/RegisterClubMainFrame";
import useGetClubsForRenewal from "@sparcs-clubs/web/features/register-club/service/useGetClubsForRenewal";

const RenewalRegisterClub = () => {
  const { data, isLoading, isError } = useGetClubsForRenewal();
  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
  } = useGetUserProfile();

  return (
    <AsyncBoundary
      isLoading={isLoading || isLoadingProfile}
      isError={isError || isErrorProfile}
    >
      <RegisterClubMainFrame
        type={RegistrationTypeEnum.Renewal}
        clubIds={data?.clubs}
        profile={profile}
      />
    </AsyncBoundary>
  );
};

export default RenewalRegisterClub;
