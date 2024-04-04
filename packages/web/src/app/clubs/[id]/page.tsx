"use client";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import ClubDetailMainFrame from "@sparcs-clubs/web/features/clubDetails/frames/ClubDetailMainFrame";
// import { fromObj } from "@sparcs-clubs/web/types/clubdetail.types";
import { getClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";

const ClubDetail = () => {
  const { data, isLoading, isError } = getClubDetail("1");

  return (
    <UseClientProvider>
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        {data && <ClubDetailMainFrame club={data} />}
        {/* TODO: data && 없이 쓰는 방법이 있을까요 */}
      </AsyncBoundary>
    </UseClientProvider>
  );
};
export default ClubDetail;
