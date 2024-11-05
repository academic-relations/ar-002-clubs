import React from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import ChangeClubInfoCard from "@sparcs-clubs/web/features/manage-club/components/ChangeClubInfoCard";

import RepresentativeLoadFrame from "./_atomic/RepresentativeLoadFrame";

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 20px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    flex-direction: column;
  }
`;

const InfoManageFrame: React.FC<{
  isRepresentative: boolean;
  clubId: number;
}> = ({ isRepresentative, clubId }) => (
  <FlexWrapper direction="column" gap={40}>
    <FoldableSectionTitle title="동아리 정보">
      <InfoWrapper>
        <ChangeClubInfoCard />
        {isRepresentative && <RepresentativeLoadFrame clubId={clubId} />}
      </InfoWrapper>
    </FoldableSectionTitle>
  </FlexWrapper>
);

export default InfoManageFrame;
