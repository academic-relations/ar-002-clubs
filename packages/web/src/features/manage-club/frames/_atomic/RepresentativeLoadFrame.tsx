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
    refetch: delegatesNowRefetch,
  } = useGetClubDelegate({ clubId });

  const {
    data: delegate1Candidates,
    isLoading: delegate1IsLoading,
    isError: delegate1IsError,
    refetch: delegate1Refetch,
  } = useGetDelegateCandidates({ clubId, delegateEnumId: 2 });

  const {
    data: delegate2Candidates,
    isLoading: delegate2IsLoading,
    isError: delegate2IsError,
    refetch: delegate2Refetch,
  } = useGetDelegateCandidates({ clubId, delegateEnumId: 3 });

  return (
    // TODO: ChangeRepresentativeCard로 변경
    <AsyncBoundary
      isLoading={isLoading || delegate1IsLoading || delegate2IsLoading}
      isError={isError || delegate1IsError || delegate2IsError}
    >
      <ChangeRepresentativeCardV1
        clubId={clubId}
        delegatesNow={delegatesNow || { delegates: [] }}
        delegate1Candidates={delegate1Candidates || { students: [] }}
        delegate2Candidates={delegate2Candidates || { students: [] }}
        refetchDelegateNow={delegatesNowRefetch}
        refetchDelegate1={delegate1Refetch}
        refetchDelegate2={delegate2Refetch}
      />
    </AsyncBoundary>
  );
};

export default RepresentativeLoadFrame;
