"use client";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";

import styled from "styled-components";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Card from "@sparcs-clubs/web/common/components/Card";
import Tag from "@sparcs-clubs/web/common/components/Tag";

import PersonIcon from "@mui/icons-material/Person";

import clubsData from "./data/clubs";

const ClubsInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  min-height: calc(100vh - 265px);
`;

const ClubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ClubCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ClubCard = styled(Card)`
  width: 262px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ClubCardText = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
`;

const ClubCardTitle = styled(ClubCardText)`
  font-size: 20px;
  line-height: 24px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClubCardPopulation = styled(ClubCardText)`
  font-size: 14px;
  line-height: 16px;
  display: flex;
  gap: 4px;
`;

const Clubs = () => {
  const getColor = (clubType: string) => {
    switch (clubType) {
      case "정동아리":
        return "BLUE";
      case "상임동아리":
        return "GREEN";
      default:
        return "ORANGE";
    }
  };
  return (
    <main>
      <UseClientProvider>
        <ClubsInner>
          <PageTitle>동아 목록</PageTitle>
          <ClubSection>
            <SectionTitle>{`생활문화 (${clubsData.length})`}</SectionTitle>
            <ClubCardList>
              {clubsData.map(club => (
                <ClubCard>
                  <ClubCardTitle>
                    {club.clubName}
                    <ClubCardPopulation>
                      <PersonIcon
                        sx={{
                          width: "16px",
                          height: "16px",
                        }}
                      />
                      {club.totalMembers}명
                    </ClubCardPopulation>
                  </ClubCardTitle>
                  <ClubCardText>
                    회장 {club.clubPresident}{" "}
                    {club.advisor ? ` | 지도교수 ${club.advisor}` : ""}
                  </ClubCardText>
                  <ClubCardText>{club.characteristicKr}</ClubCardText>
                  <Tag color={getColor(club.clubType)}>{club.clubType}</Tag>
                </ClubCard>
              ))}
            </ClubCardList>
          </ClubSection>
        </ClubsInner>
      </UseClientProvider>
    </main>
  );
};

export default Clubs;
