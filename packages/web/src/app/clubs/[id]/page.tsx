"use client";

import { useParams } from "next/navigation";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import ClubDetailPublicFrame from "@sparcs-clubs/web/features/clubDetails/frames/ClubDetailPublicFrame";
import ClubDetailStudentFrame from "@sparcs-clubs/web/features/clubDetails/frames/ClubDetailStudentFrame";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";

const ClubDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetClubDetail(id as string);
  const { isLoggedIn } = useAuth();

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      {isLoggedIn
        ? data && <ClubDetailStudentFrame club={data} />
        : data && <ClubDetailPublicFrame club={data} />}{" "}
    </AsyncBoundary>
  );
};
export default ClubDetail;
