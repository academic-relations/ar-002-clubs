import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import useProvisionalActivities from "@sparcs-clubs/web/features/register-club/services/getProvisionalActivities";

import MyRegisterClubAcfTable from "../components/MyRegisterClubAcfTable";

interface MyRegisterClubAcfFrameProps {
  profile: string;
  clubId: number;
}

const MyRegisterClubAcfFrame: React.FC<MyRegisterClubAcfFrameProps> = ({
  profile,
  clubId,
}) => {
  const { data, isLoading, isError } = useProvisionalActivities(profile, {
    clubId,
  });
  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper direction="column" gap={16}>
        <Typography fw="MEDIUM" fs={16} lh={20}>
          가등록 / 등록 취소 기간 활동 보고서 (총{" "}
          {data ? data.activities.length : 0}개)
        </Typography>
        {data && (
          <MyRegisterClubAcfTable
            clubRegisterAcfList={data}
            profile={profile}
          />
        )}
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default MyRegisterClubAcfFrame;
