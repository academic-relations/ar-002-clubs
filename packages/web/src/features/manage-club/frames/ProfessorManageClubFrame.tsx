"use client";

import React, { useEffect, useMemo, useState } from "react";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Select from "@sparcs-clubs/web/common/components/Select";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import NoManageClubForProfessor from "@sparcs-clubs/web/common/frames/NoManageClubForProfessor";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";
import useGetMyClubProfessor from "@sparcs-clubs/web/features/my/clubs/service/getMyClubProfessor";
import {
  getTagColorFromClubType,
  getTagColorFromDivision,
  getTagContentFromClubType,
} from "@sparcs-clubs/web/types/clubdetail.types";
import useGetSemesterNow from "@sparcs-clubs/web/utils/getSemesterNow";

const ClubInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const ClubInfoItem: React.FC<{ title: string; content: React.ReactNode }> = ({
  title,
  content,
}) => (
  <FlexWrapper direction="row" gap={40} style={{ flex: 1 }}>
    <Typography
      fs={16}
      lh={24}
      fw="MEDIUM"
      style={{ width: "120px", textAlign: "center" }}
    >
      {title}
    </Typography>
    <Typography fs={16} lh={24} style={{ flex: 1 }}>
      {content}
    </Typography>
  </FlexWrapper>
);

const ClubInfoSection: React.FC<{ clubId: string }> = ({ clubId }) => {
  const { data, isLoading, isError } = useGetClubDetail(clubId);

  if (!data) return null;

  return (
    <FoldableSectionTitle title="동아리 정보">
      <FlexWrapper direction="column" gap={40}>
        <AsyncBoundary isLoading={isLoading} isError={isError}>
          <Card outline gap={32}>
            <ClubInfoRow>
              {/* TODO: (@dora) 대표자 전화번호도 함께 보여주기 */}
              <ClubInfoItem title="대표자" content={data.representative} />
              <ClubInfoItem title="총원" content={`${data.totalMemberCnt}명`} />
            </ClubInfoRow>
            <ClubInfoRow>
              <ClubInfoItem
                title="동아리 지위"
                content={
                  <Tag
                    color={getTagColorFromClubType(data.type, data.isPermanent)}
                  >
                    {getTagContentFromClubType(data.type, data.isPermanent)}
                  </Tag>
                }
              />
              <ClubInfoItem
                title="소속 분과"
                content={
                  <Tag color={getTagColorFromDivision(data.divisionName)}>
                    {data.divisionName}
                  </Tag>
                }
              />
            </ClubInfoRow>
            <ClubInfoRow>
              <ClubInfoItem title="성격" content={data.characteristic ?? "-"} />
              <ClubInfoItem
                title="설립연도"
                content={`${data.foundingYear}년`}
              />
            </ClubInfoRow>
            {/* TODO: (@dora) 동아리방 데이터 추가되면 추가 */}
            {/* <ClubInfoRow>
              <ClubInfoItem title="동아리방" content={data.room ?? "-"} />
            </ClubInfoRow> */}
            <ClubInfoRow>
              <ClubInfoItem
                title="동아리 설명"
                content={
                  <Typography fs={16} lh={24}>
                    {data.description}
                  </Typography>
                }
              />
            </ClubInfoRow>
          </Card>
        </AsyncBoundary>
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};

const ClubActivitySection: React.FC<{ clubId: number }> = ({ clubId }) => {
  console.log(clubId);

  return (
    <FoldableSectionTitle title="동아리 활동">
      <FlexWrapper direction="column" gap={40}>
        <FlexWrapper direction="column" gap={20}>
          TBD
        </FlexWrapper>
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};

const ClubMemberSection: React.FC<{ clubId: number }> = ({ clubId }) => {
  console.log(clubId);

  return (
    <FoldableSectionTitle title="회원 명단">
      <FlexWrapper direction="column" gap={40}>
        <FlexWrapper direction="column" gap={20}>
          TBD
        </FlexWrapper>
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};

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

  /**
   * TODO: (@dora)
   * - 현재 지도교수 여부를 "동아리에 속해 있는가"로 처리했는데,
   * - 동아리에 속해 있으나 지도교수가 아닌 경우가 생길 수 있기 때문에
   * - 지도교수 여부를 확인하는 API로 로직을 수정해야 함
   */
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
