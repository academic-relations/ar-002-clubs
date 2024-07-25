"use client";

import React, { useMemo } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ClubsSectionFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsSectionFrame";
import useGetMyClub from "@sparcs-clubs/web/features/my/clubs/service/useGetMyClub";

const MyClubsMainFrame: React.FC = () => {
  const { data, isLoading, isError } = useGetMyClub();
  const isMyClubsExist = useMemo(
    () => (data?.semesters ?? []).length > 0,
    [data],
  );
  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "마이페이지", path: "/my" },
          { name: "나의 동아리", path: "/my/clubs" },
        ]}
        title="나의 동아리"
      />
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
    </FlexWrapper>
  );
};

export default MyClubsMainFrame;
