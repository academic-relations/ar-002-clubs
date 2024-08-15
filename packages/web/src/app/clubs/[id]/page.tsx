"use client";

import { useParams } from "next/navigation";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import ClubDetailMainFrame from "@sparcs-clubs/web/features/clubDetails/frames/ClubDetailMainFrame";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";
import { checkResisteringPeriod } from "@sparcs-clubs/web/features/clubDetails/services/getEvent";

const ClubDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetClubDetail(id as string);

  // TODO : 등록 기간인지 받아오기

  const [isRegistrationPeriod, eventLoading] = checkResisteringPeriod();

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
