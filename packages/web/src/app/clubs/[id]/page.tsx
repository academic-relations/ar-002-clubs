"use client";

import { useParams } from "next/navigation";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import ClubDetailMainFrame from "@sparcs-clubs/web/features/clubDetails/frames/ClubDetailMainFrame";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";

const ClubDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetClubDetail(id as string);

  // TODO : 등록 기간인지 받아오기
  const isRegistrationPeriod = true;

  return (
    <UseClientProvider>
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        {data && (
          <ClubDetailMainFrame
            club={data}
            isRegistrationPeriod={isRegistrationPeriod}
          />
        )}
      </AsyncBoundary>
    </UseClientProvider>
  );
};
export default ClubDetail;
