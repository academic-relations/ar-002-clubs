import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import ChangeRepresentativeCardV1 from "@sparcs-clubs/web/features/manage-club/components/ChangeRepresentativeCardV1";
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
    // TODO: ChangeRepresentativeCard로 변경
    <AsyncBoundary
      isLoading={isLoading || clubMembersIsLoading}
      isError={isError || clubMembersIsError}
    >
      <ChangeRepresentativeCardV1
        clubId={clubId}
        delegatesNow={delegatesNow || { delegates: [] }}
        clubMembers={clubMembers || { students: [] }}
      />
    </AsyncBoundary>
  );
};

export default RepresentativeLoadFrame;
