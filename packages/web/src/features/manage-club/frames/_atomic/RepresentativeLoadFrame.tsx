import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
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
  } = useGetDelegateCandidates({ clubId, delegateEnumId: 1 });

  return (
    <AsyncBoundary
      isLoading={isLoading || clubMembersIsLoading}
      isError={isError || clubMembersIsError}
    >
      <ChangeRepresentativeCard
        clubId={clubId}
        delegatesNow={delegatesNow || { delegates: [] }}
        clubMembers={clubMembers || { students: [] }}
      />
    </AsyncBoundary>
  );
};

export default RepresentativeLoadFrame;
