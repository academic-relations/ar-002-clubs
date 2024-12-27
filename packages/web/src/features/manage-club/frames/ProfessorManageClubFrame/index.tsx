"use client";

import React, { useEffect, useMemo, useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Select from "@sparcs-clubs/web/common/components/Select";
import NoManageClubForProfessor from "@sparcs-clubs/web/common/frames/NoManageClubForProfessor";

import useGetMyClubProfessor from "@sparcs-clubs/web/features/my/clubs/service/getMyClubProfessor";

import useGetSemesterNow from "@sparcs-clubs/web/utils/getSemesterNow";

import ClubActivitySection from "./ClubActivitySection";
import ClubInfoSection from "./ClubInfoSection";
import ClubMemberSection from "./ClubMemberSection";

const ProfessorManageClubFrame: React.FC = () => {
  const {
    data: clubData,
    isLoading: clubIsLoading,
    isError: clubIsError,
  } = useGetMyClubProfessor();
  const {
    semester: semesterData,
    isLoading: semesterIsLoading,
    isError: semesterIsError,
  } = useGetSemesterNow();

  const isLoading = clubIsLoading || semesterIsLoading;
  const isError = clubIsError || semesterIsError;

  const clubList = useMemo(() => {
    if (!clubData || !semesterData) return [];
    return (
      clubData.semesters.find(semester => semester.id === semesterData.id)
        ?.clubs ?? []
    );
  }, [clubData, semesterData]);

  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  useEffect(() => {
    if (clubList.length > 0) {
      setSelectedClubId(clubList[0].id.toString());
    } else {
      setSelectedClubId(null);
    }
  }, [clubList]);

  // NOTE: (@dora) 동아리에 속해 있는 교수는 항상 해당 동아리의 지도교수임
  if (clubList.length === 0) {
    return <NoManageClubForProfessor />;
  }

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "대표 동아리 관리", path: "/manage-club" }]}
        title="대표 동아리 관리"
      />

      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <Select
          label="동아리"
          placeholder="동아리를 선택해주세요"
          items={clubList.map(club => ({
            value: club.id.toString(),
            label: club.name_kr,
          }))}
          value={selectedClubId}
          onChange={value => setSelectedClubId(value)}
        />

        {selectedClubId && <ClubInfoSection clubId={selectedClubId} />}
        {selectedClubId && (
          <ClubActivitySection clubId={Number(selectedClubId)} />
        )}
        {selectedClubId && (
          <ClubMemberSection clubId={Number(selectedClubId)} />
        )}
      </AsyncBoundary>
    </FlexWrapper>
  );
};

export default ProfessorManageClubFrame;
