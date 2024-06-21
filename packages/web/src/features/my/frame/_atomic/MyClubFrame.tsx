import React from "react";
import styled from "styled-components";

import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import { ManageWrapper } from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import ClubListGrid from "@sparcs-clubs/web/features/clubs/components/ClubListGrid";
import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import useGetMyClub from "@sparcs-clubs/web/features/my/clubs/service/useGetMyClub";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

const DetailTitleWrapper = styled.div`
  padding-left: 24px;
`;

const MyClubFrame: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(true);
  const { data, isLoading, isError } = useGetMyClub();

  return (
    <ManageWrapper>
      <FoldableSectionTitle
        title="나의 동아리"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <AsyncBoundary isLoading={isLoading} isError={isError}>
          <FlexWrapper direction="column" gap={20}>
            <DetailTitleWrapper>
              <MoreDetailTitle
                title="2024년 봄학기"
                moreDetail="전체 보기"
                moreDetailPath="/my/clubs"
              />
            </DetailTitleWrapper>
            <ClubListGrid clubList={data?.semesters[0].clubs ?? []} />
          </FlexWrapper>
        </AsyncBoundary>
      )}
    </ManageWrapper>
  );
};

export default MyClubFrame;
