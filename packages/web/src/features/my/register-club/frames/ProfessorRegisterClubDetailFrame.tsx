import React from "react";

import { useParams } from "next/navigation";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import useGetClubRegistrationProfessor from "@sparcs-clubs/web/features/my/services/getProfessorClubRegistration";

import MyRegisterClubDetailFrame from "./MyRegisterClubDetailFrame";

const ProfessorRegisterClubDetailFrame: React.FC<{ profile: string }> = ({
  profile,
}) => {
  const { id } = useParams();

  const {
    data: clubDetail,
    isLoading,
    isError,
  } = useGetClubRegistrationProfessor({ applyId: +id });

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      {clubDetail && (
        <MyRegisterClubDetailFrame profile={profile} clubDetail={clubDetail} />
      )}
    </AsyncBoundary>
  );
};

export default ProfessorRegisterClubDetailFrame;
