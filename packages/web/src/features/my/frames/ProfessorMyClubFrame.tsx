import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import Typography from "@sparcs-clubs/web/common/components/Typography";
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
          {data && data.semesters.length > 0 ? (
            <ClubListGrid clubList={data?.semesters[0].clubs ?? []} />
          ) : (
            <Typography color="GRAY.300" fs={16} fw="MEDIUM">
              이번 학기 동아리가 없습니다
            </Typography>
          )}
        </FlexWrapper>
      </AsyncBoundary>
    </FoldableSectionTitle>
  );
};

export default ProfessorMyClubFrame;
