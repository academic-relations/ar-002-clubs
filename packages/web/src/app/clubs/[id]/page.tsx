"use client";

import { useParams } from "next/navigation";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import ClubDetailMainFrame from "@sparcs-clubs/web/features/clubDetails/frames/ClubDetailMainFrame";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";
import { useCheckResisteringPeriod } from "@sparcs-clubs/web/hooks/checkResisteringPeriod";

const ClubDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetClubDetail(id as string);
  const [isRegistrationPeriod, eventLoading] = useCheckResisteringPeriod();

  return (
    <AsyncBoundary isLoading={isLoading || eventLoading} isError={isError}>
      {data && (
        <ClubDetailMainFrame
          club={data}
          isRegistrationPeriod={isRegistrationPeriod}
        />
      )}
    </AsyncBoundary>
  );
};
export default ClubDetail;
