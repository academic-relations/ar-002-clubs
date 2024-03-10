"use client";

import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
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
  padding: 20px;
`;

// const CardContentsInner = styled.div``;

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
        <Card>{club.clubName}</Card>
      ))}
    </CardGridInner>
  );
};

const Clubs = () => (
  <main>
    <UseClientProvider>
      <SectionTitle>생활문화</SectionTitle>
      <CardGrid clubsDataList={clubsData} />
    </UseClientProvider>
  </main>
);

export default Clubs;
