import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import ClubListGrid from "@sparcs-clubs/web/features/clubs/components/ClubListGrid";

import useGetMyClubProfessor from "../clubs/service/getMyClubProfessor";

const ProfessorMyClubFrame: React.FC = () => {
  const { data, isLoading, isError } = useGetMyClubProfessor();

  return (
    <FoldableSectionTitle title="나의 동아리">
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <FlexWrapper direction="column" gap={20}>
          <MoreDetailTitle
            title="2024년 봄학기"
            moreDetail="전체 보기"
            moreDetailPath="/my/clubs"
          />
          <ClubListGrid clubList={data?.semesters[0].clubs ?? []} />
        </FlexWrapper>
      </AsyncBoundary>
    </FoldableSectionTitle>
  );
};

export default ProfessorMyClubFrame;
