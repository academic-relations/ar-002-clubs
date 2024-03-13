"use client";

import Card from "@sparcs-clubs/web/common/components/Card";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import type { FC } from "react";
import { useCallback, useState } from "react";
import styled from "styled-components";
import clubsData from "./data/clubs";

const SizedBox = styled.div<{ width?: number; height?: number }>`
  width: ${props => (props.width ? `${props.width}px` : `100%`)};
  height: ${props => (props.height ? `${props.height}px` : `100%`)};
`;

const SectionTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex: 1 0 0;
`;

const Toggle = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  text-decoration-line: underline;
  cursor: pointer;
`;

const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  gap: 16px;

  padding-left: 24px;
  padding-top: 20px;
  min-width: 262px;
  box-sizing: border-box;
`;

const ClubNameAndMemberCountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  overflow: hidden;
`;

const ClubName = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  word-break: break-all;

  text-overflow: ellipsis;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 20px;
  line-height: 24px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
`;

const ClubMemberCountWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`;

const IconPlaceholder = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
`;

interface ClubData {
  id: number;
  clubName: string;
  characteristicKr: string;
  clubType: string;
  clubPresident: string;
  advisor: null | string;
  totalMembers: number;
}

enum ClubType {
  EXECUTIVE = "상임동아리",
  OFFICIAL = "정동아리",
  INFORMAL = "가동아리",
}

interface SectionProps {
  title: string;
  dataList: Array<ClubData>;
}

const Section: FC<SectionProps> = ({ title, dataList }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleHandler = useCallback(
    () => setToggle(!toggle),
    [toggle, setToggle],
  );

  const getTagColor = (type: string) => {
    switch (type) {
      case "상임동아리":
        return "GREEN";
      case "정동아리":
        return "BLUE";
      case "가동아리":
      default:
        return "ORANGE";
    }
  };

  dataList.sort((a, b) => {
    const aIndex = Object.values(ClubType).findIndex(
      club => club === (a.clubType as ClubType),
    );
    const bIndex = Object.values(ClubType).findIndex(
      club => club === (b.clubType as ClubType),
    );
    return aIndex - bIndex;
  });

  return (
    <>
      <SectionTitleContainer>
        <SectionTitle size="lg">
          {title} ({dataList.length})
        </SectionTitle>
        <Toggle onClick={toggleHandler}>{toggle ? `접기` : `펼치기`}</Toggle>
      </SectionTitleContainer>

      {toggle && (
        <SectionContainer>
          {dataList.map(data => (
            <Card key={data.id}>
              <ClubNameAndMemberCountContainer>
                <ClubName>{data.clubName}</ClubName>
                <ClubMemberCountWithIcon>
                  <IconPlaceholder />
                  {data.totalMembers}
                </ClubMemberCountWithIcon>
              </ClubNameAndMemberCountContainer>

              <div>
                회장 {data.clubPresident}
                {data.advisor && ` | 지도교수 ${data.advisor}`}
              </div>
              <div>{data.characteristicKr}</div>
              <Tag color={getTagColor(data.clubType)}>{data.clubType}</Tag>
            </Card>
          ))}
        </SectionContainer>
      )}
    </>
  );
};

const Clubs = () => (
  <main>
    <UseClientProvider>
      <PageTitle>동아리 목록</PageTitle>
      <SizedBox height={60} />
      <Section title="생화문화" dataList={clubsData} />
    </UseClientProvider>
  </main>
);

export default Clubs;
