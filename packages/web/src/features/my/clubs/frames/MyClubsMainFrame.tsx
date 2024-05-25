"use client";

import React, { useMemo } from "react";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import ClubsSectionFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsSectionFrame";

import useGetMyClub from "@sparcs-clubs/web/features/my/clubs/service/useGetMyClub";
import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";

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

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MyClubsMainFrame: React.FC = () => {
  const { data, isLoading, isError } = useGetMyClub();
  const isMyClubsExist = useMemo(
    () => (data?.semesters ?? []).length > 0,
    [data],
  );
  return (
    <ClubsPageMainFrameInner>
      <PageHeadWrapper>
        <BreadCrumb
          items={[
            { name: "마이페이지", path: "/my" },
            { name: "나의 동아리", path: "/my/clubs" },
          ]}
        />
        <PageTitle>나의 동아리</PageTitle>
      </PageHeadWrapper>
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
                    key={myClub.name}
                  />
                ),
            )}
          </ClubListsByDepartmentWrapper>
        )}
      </AsyncBoundary>
    </ClubsPageMainFrameInner>
  );
};

export default MyClubsMainFrame;
