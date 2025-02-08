import { useParams } from "next/navigation";
import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import useGetClubRegistration from "@sparcs-clubs/web/features/my/services/useGetClubRegistration";

import MyRegisterClubDetailFrame from "./MyRegisterClubDetailFrame";

const StudentRegisterClubDetailFrame: React.FC<{ profile: string }> = ({
  profile,
}) => {
  const { id } = useParams();

  const {
    data: clubDetail,
    isLoading,
    isError,
    refetch,
  } = useGetClubRegistration({ applyId: +id });

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      {clubDetail && (
        <MyRegisterClubDetailFrame
          profile={profile}
          clubDetail={clubDetail}
          refetch={refetch}
        />
      )}
    </AsyncBoundary>
  );
};

export default StudentRegisterClubDetailFrame;
