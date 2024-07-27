"use client";

import { useParams } from "next/navigation";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import ClubDetailMainFrame from "@sparcs-clubs/web/features/clubDetails/frames/ClubDetailMainFrame";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";

const ClubDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetClubDetail(id as string);

  // 임의로 등록 기간인지 여부를 확인하는 변수를 만들었어요.
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
