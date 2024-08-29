"use client";

import React, { useMemo } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import ClubsSectionFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsSectionFrame";
import useGetMyClub from "@sparcs-clubs/web/features/my/clubs/service/useGetMyClub";

const MyClubsMainFrame: React.FC = () => {
  const { data, isLoading, isError } = useGetMyClub();
  const isMyClubsExist = useMemo(
    () => (data?.semesters ?? []).length > 0,
    [data],
  );
  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      {isMyClubsExist && (
        <FlexWrapper direction="column" gap={60}>
          {(data?.semesters ?? []).map(
            myClub =>
              myClub.clubs.length > 0 && (
                <ClubsSectionFrame
                  showLength={false}
                  title={myClub.name}
                  clubList={myClub.clubs}
                  key={myClub.name}
                />
              ),
          )}
        </FlexWrapper>
      )}
    </AsyncBoundary>
  );
};

export default MyClubsMainFrame;
