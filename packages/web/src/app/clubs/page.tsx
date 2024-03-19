"use client";

import { useState } from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import styled from "styled-components";
import Tag from "@sparcs-clubs/web/common/components/Tag";

import clubsData from "./data/clubs";

const EmptyGap = styled.div<{ height: number }>`
  height: ${props => props.height}px;
`;

const SectionTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OpenToggleButton = styled.div`
  font-size: 15px;
  text-decoration-line: underline;
  color: ${({ theme }) => theme.colors.GRAY};
`;

const CardsContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  padding-left: 25px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 14px;
`;

const CardNameContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardName = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  font-size: 20px;
`;

const CardMembersContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardMembers = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  font-size: 14px;
`;

const CardPresident = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  font-size: 16px;
`;

const CardCharacteristic = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  font-size: 16px;
`;

const clubTypeHandler = (clubType: string) => {
  switch (clubType) {
    case "상임동아리":
      return "GREEN";
    case "정동아리":
      return "BLUE";
    default:
      return "ORANGE";
  }
};

const Clubs = () => {
  const [openToggle, setOpenToggle] = useState<boolean>(false);

  return (
    <main>
      <UseClientProvider>
        <PageTitle>동아리 목록</PageTitle>
        <EmptyGap height={50} />
        <SectionTitleContainer>
          <SectionTitle>생활문화 ({clubsData.length})</SectionTitle>
          <OpenToggleButton onClick={() => setOpenToggle(!openToggle)}>
            {openToggle ? "접기" : "펼치기"}
          </OpenToggleButton>
        </SectionTitleContainer>

        <EmptyGap height={10} />

        {openToggle && (
          <CardsContainer>
            {clubsData
              .sort((a, b) =>
                (a.clubType === "가동아리" ? "차" : a.clubType).localeCompare(
                  b.clubType === "가동아리" ? "차" : b.clubType,
                ),
              )
              .map(clubData => (
                <Card>
                  <CardNameContainer>
                    <CardName>{clubData.clubName}</CardName>

                    <CardMembersContainer>
                      <div
                        style={{ width: "20px", backgroundColor: "black" }}
                      />
                      {/* 위 div는 어떤 아이콘 넣을지 주어지지 않아서 일단 placeholder 역할! */}
                      <CardMembers>{clubData.totalMembers}</CardMembers>
                    </CardMembersContainer>
                  </CardNameContainer>
                  <EmptyGap height={15} />
                  <CardPresident>회장 {clubData.clubPresident}</CardPresident>
                  <EmptyGap height={15} />
                  <CardCharacteristic>
                    {clubData.characteristicKr}
                  </CardCharacteristic>
                  <EmptyGap height={15} />
                  <Tag color={clubTypeHandler(clubData.clubType)}>
                    {clubData.clubType}
                  </Tag>
                </Card>
              ))}
          </CardsContainer>
        )}
      </UseClientProvider>
    </main>
  );
};

export default Clubs;
