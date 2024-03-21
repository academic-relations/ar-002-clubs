"use client";

import React, { useMemo } from "react";
import styled from "styled-components";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import ClubsSectionFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsSectionFrame";
import { MyClubsInfo } from "@sparcs-clubs/web/types/myClubs.types";

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

interface MyPageMainFrameProps {
  myClubList: Array<MyClubsInfo>;
}

const MyPageMainFrame: React.FC<MyPageMainFrameProps> = ({ myClubList }) => {
  const isMyClubsExist = useMemo(() => myClubList.length > 0, [myClubList]);
  return (
    <ClubsPageMainFrameInner>
      <PageTitle>나의 동아리</PageTitle>
      {isMyClubsExist && (
        <ClubListsByDepartmentWrapper>
          {myClubList.map((myClub: MyClubsInfo) => (
            <ClubsSectionFrame
              showLength={false}
              title={myClub.name}
              clubList={myClub.clubs}
              key={myClub.semester}
            />
          ))}
        </ClubListsByDepartmentWrapper>
      )}
    </ClubsPageMainFrameInner>
  );
};

export default MyPageMainFrame;
