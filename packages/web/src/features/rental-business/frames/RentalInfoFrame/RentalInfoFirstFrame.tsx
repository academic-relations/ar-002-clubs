import React from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { RentalFrameProps } from "../RentalNoticeFrame";

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 40px;
  align-self: stretch;
`;

const RentalInfoFirstFrame: React.FC<RentalFrameProps> = () => (
  <StyledCard type="outline">
    <Typography type="p">동아리 이름</Typography>
    <Typography type="p">신청자 이름</Typography>
    <Typography type="p">신청자 전화번호</Typography>
  </StyledCard>
);

export default RentalInfoFirstFrame;
