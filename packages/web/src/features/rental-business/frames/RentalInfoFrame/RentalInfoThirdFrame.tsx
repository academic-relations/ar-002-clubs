import React from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { RentalFrameProps } from "../RentalNoticeFrame";

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 20px;
  align-self: stretch;
`;

const StyledTypography = styled(Typography)`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
`;

const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  padding-left: 20px;
`;

const RentalInfoThirdFrame: React.FC<RentalFrameProps> = () => (
  <StyledCard type="outline">
    <CardInner>
      <StyledTypography type="p">대여 물품</StyledTypography>
      <StyledList>
        <li>대여 물품 1</li>
        <li>대여 물품 2</li>
        <li>대여 물품 3</li>
      </StyledList>
    </CardInner>
    <StyledTypography type="p">대여 목적</StyledTypography>
    <StyledTypography type="p">수령일</StyledTypography>
  </StyledCard>
);

export default RentalInfoThirdFrame;
