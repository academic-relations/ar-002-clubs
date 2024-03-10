"use client";

import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import clubsData from "./data/clubs";

interface ClubsData {
  id: number;
  clubName: string;
  characteristicKr: string;
  clubType: string;
  clubPresident: string;
  advisor: string | null;
  totalMembers: number;
}
interface CardGridProps {
  clubsDataList: ClubsData[];
}

const CardGridInner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding-left: 24px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;
`;

const ClubName = styled.div`
  flex: 1 0 0;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;

const ClubCardHead = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const ClubMembers = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ClubMembersInner = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;

const IconPlaceHolder = styled.div`
  width: 16px;
  height: 16px;
  background-color: #000;
`;

const ClubDetail = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

const getTagColor = (clubType: string) => {
  switch (clubType) {
    case "상임동아리":
      return "GREEN";
    case "가동아리":
      return "ORANGE";
    default:
      return "BLUE";
  }
};

// eslint-disable-next-line react/prop-types
const CardGrid: React.FC<CardGridProps> = ({ clubsDataList = [] }) => {
  const sortedClubs = clubsDataList.sort((a, b) => {
    if (a.clubType === "상임동아리" && b.clubType !== "상임동아리") {
      return -1;
    }
    if (a.clubType !== "상임동아리" && b.clubType === "상임동아리") {
      return 1;
    }
    return 0;
  });
  return (
    <CardGridInner>
      {sortedClubs.map(club => (
        <Card key={club.id}>
          <CardInner>
            <ClubCardHead>
              <ClubName>{club.clubName}</ClubName>
              <ClubMembers>
                <IconPlaceHolder />
                <ClubMembersInner>{club.totalMembers}</ClubMembersInner>
              </ClubMembers>
            </ClubCardHead>
            <ClubDetail>
              회장 {club.clubPresident}
              {club.advisor ? ` | 지도교수 ${club.advisor}` : ""}
            </ClubDetail>
            <ClubDetail>{club.characteristicKr}</ClubDetail>
            <Tag color={getTagColor(club.clubType)}>{club.clubType}</Tag>
          </CardInner>
        </Card>
      ))}
    </CardGridInner>
  );
};

const Clubs = () => (
  <main>
    <UseClientProvider>
      <Section>
        <SectionTitle size="lg">생활문화 ({clubsData.length})</SectionTitle>
        <CardGrid clubsDataList={clubsData} />
      </Section>
    </UseClientProvider>
  </main>
);

export default Clubs;
