import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import useGetSemesters from "@sparcs-clubs/web/common/services/getSemesters";
import ClubListGrid from "@sparcs-clubs/web/features/clubs/components/ClubListGrid";
import useGetMyClub from "@sparcs-clubs/web/features/my/clubs/service/useGetMyClub";

const MyClubFrame: React.FC = () => {
  const { data, isLoading, isError } = useGetMyClub();
  const {
    data: semesterInfo,
    isLoading: semesterLoading,
    isError: semesterError,
  } = useGetSemesters({
    pageOffset: 1,
    itemCount: 1,
  });

  return (
    <FoldableSectionTitle title="나의 동아리">
      <AsyncBoundary
        isLoading={isLoading || semesterLoading}
        isError={isError || semesterError}
      >
        {" "}
        <FlexWrapper direction="column" gap={20}>
          <MoreDetailTitle
            title={`${semesterInfo?.semesters[0].year}년 ${semesterInfo?.semesters[0].name}학기`}
            moreDetail="전체 보기"
            moreDetailPath="/my/clubs"
          />
          {data &&
          data.semesters.length > 0 &&
          (
            data.semesters.find(
              semester => semester.id === semesterInfo?.semesters[0].id,
            )?.clubs ?? []
          ).length > 0 ? (
            <ClubListGrid
              clubList={
                data.semesters.find(
                  semester => semester.id === semesterInfo?.semesters[0].id,
                )?.clubs ?? []
              }
            />
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

export default MyClubFrame;
