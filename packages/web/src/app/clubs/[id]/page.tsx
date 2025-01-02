"use client";

import { useParams } from "next/navigation";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import ClubDetailPublicFrame from "@sparcs-clubs/web/features/clubs/frames/ClubDetailPublicFrame";
import ClubDetailStudentFrame from "@sparcs-clubs/web/features/clubs/frames/ClubDetailStudentFrame";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubs/services/getClubDetail";
import isStudent from "@sparcs-clubs/web/utils/isStudent";

const ClubDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetClubDetail(id as string);
  const { isLoggedIn, profile } = useAuth();

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      {isLoggedIn && isStudent(profile)
        ? data && <ClubDetailStudentFrame club={data} />
        : data && <ClubDetailPublicFrame club={data} />}
    </AsyncBoundary>
  );
};
export default ClubDetail;
