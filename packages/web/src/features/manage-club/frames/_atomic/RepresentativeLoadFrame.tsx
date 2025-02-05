import React from "react";

import { ClubDelegateEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubs/services/getClubDetail";
import ChangeRepresentativeCard from "@sparcs-clubs/web/features/manage-club/components/ChangeRepresentativeCard";
import { useGetClubDelegate } from "@sparcs-clubs/web/features/manage-club/services/getClubDelegate";
import { useGetDelegateCandidates } from "@sparcs-clubs/web/features/manage-club/services/getDelegateCandidates";

const RepresentativeLoadFrame: React.FC<{
  clubId: number;
}> = ({ clubId }) => {
  const {
    data: delegatesNow,
    isLoading,
    isError,
  } = useGetClubDelegate({ clubId });

  const {
    data: clubMembers,
    isLoading: clubMembersIsLoading,
    isError: clubMembersIsError,
  } = useGetDelegateCandidates({
    clubId,
    delegateEnumId: ClubDelegateEnum.Representative,
  });

  const {
    data: clubInfo,
    isLoading: clubInfoIsLoading,
    isError: clubInfoIsError,
  } = useGetClubDetail(clubId.toString());

  return (
    <AsyncBoundary
      isLoading={isLoading || clubMembersIsLoading || clubInfoIsLoading}
      isError={isError || clubMembersIsError || clubInfoIsError}
    >
      <ChangeRepresentativeCard
        clubId={clubId}
        clubName={clubInfo?.name_kr || ""}
        delegatesNow={delegatesNow || { delegates: [] }}
        clubMembers={clubMembers || { students: [] }}
      />
    </AsyncBoundary>
  );
};

export default RepresentativeLoadFrame;
