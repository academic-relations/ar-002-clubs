"use client";

import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";

import RegisterClubMainFrame from "@sparcs-clubs/web/features/register-club/frame/RegisterClubMainFrame";
import useGetClubsForPromotional from "@sparcs-clubs/web/features/register-club/service/useGetClubsForPromotional";

const PromotionalRegisterClub = () => {
  const { data, isLoading, isError } = useGetClubsForPromotional();
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
        type={RegistrationTypeEnum.Promotional}
        profile={profile}
        clubIds={data?.clubs}
      />
    </AsyncBoundary>
  );
};

export default PromotionalRegisterClub;
