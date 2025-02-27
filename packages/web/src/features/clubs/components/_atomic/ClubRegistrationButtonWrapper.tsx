"use client";

import React from "react";

import type { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";
import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import { useGetMyMemberRegistration } from "@sparcs-clubs/web/features/clubs/services/getMyMemberRegistration";

import ClubRegistrationButton from "../ClubRegistrationButton";

interface ClubRegistrationButtonWrapperProps {
  club: ApiClb001ResponseOK["divisions"][number]["clubs"][number];
  isMobile?: boolean;
}

const ClubRegistrationButtonWrapper: React.FC<
  ClubRegistrationButtonWrapperProps
> = ({ club, isMobile = false }) => {
  const {
    data: myRegistrationList,
    isLoading,
    isError,
    refetch,
  } = useGetMyMemberRegistration();

  let isInclub = false;
  let isRegistered = false;

  if (myRegistrationList && myRegistrationList.applies.length > 0) {
    const thisRegistration = myRegistrationList.applies.find(
      apply => apply.clubId === club.id,
    );
    if (thisRegistration) {
      if (
        thisRegistration.applyStatusEnumId ===
        RegistrationApplicationStudentStatusEnum.Approved
      ) {
        isInclub = true;
      }
      isRegistered = true;
    } else {
      isRegistered = false;
    }
  }

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <ClubRegistrationButton
        club={club}
        refetch={refetch}
        isInClub={isInclub}
        isRegistered={isRegistered}
        isMobile={isMobile}
        myRegistrationList={myRegistrationList ?? { applies: [] }}
      />
    </AsyncBoundary>
  );
};
export default ClubRegistrationButtonWrapper;
