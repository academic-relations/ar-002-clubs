"use client";

import React, { useMemo } from "react";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

import ClubsSectionFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsSectionFrame";
import useGetMyClub from "@sparcs-clubs/web/features/my/clubs/service/useGetMyClub";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

const ClubsPageMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ClubListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const MyClubsMainFrame: React.FC = () => {
  const { data, isLoading, isError } = useGetMyClub();
  const isMyClubsExist = useMemo(
    () => (data?.semesters ?? []).length > 0,
    [data],
  );
  return (
    <ClubsPageMainFrameInner>
      <PageHead
        items={[
          { name: "마이페이지", path: "/my" },
          { name: "나의 동아리", path: "/my/clubs" },
        ]}
        title="나의 동아리"
      />
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        {isMyClubsExist && (
          <ClubListWrapper>
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
          </ClubListWrapper>
        )}
      </AsyncBoundary>
    </ClubsPageMainFrameInner>
  );
};

export default MyClubsMainFrame;
