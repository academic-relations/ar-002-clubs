"use client";

import React, { useMemo } from "react";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import ClubsSectionFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsSectionFrame";

import useGetMyClub from "@sparcs-clubs/web/features/my/service/useGetMyClub";

const ClubsPageMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ClubListsByDepartmentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const MyPageMainFrame: React.FC = () => {
  const { data, isLoading, isError } = useGetMyClub();
  const isMyClubsExist = useMemo(
    () => (data?.semesters ?? []).length > 0,
    [data],
  );
  return (
    <ClubsPageMainFrameInner>
      <PageTitle>나의 동아리</PageTitle>
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        {isMyClubsExist && (
          <ClubListsByDepartmentWrapper>
            {(data?.semesters ?? []).map(
              myClub =>
                myClub.clubs.length > 0 && (
                  <ClubsSectionFrame
                    showLength={false}
                    title={myClub.name}
                    clubList={myClub.clubs}
                    key={myClub.semester}
                  />
                ),
            )}
          </ClubListsByDepartmentWrapper>
        )}
      </AsyncBoundary>
    </ClubsPageMainFrameInner>
  );
};

export default MyPageMainFrame;
