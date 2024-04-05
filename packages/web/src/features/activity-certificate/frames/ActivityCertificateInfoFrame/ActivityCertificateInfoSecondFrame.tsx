import React from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { ActivityCertificateFrameProps } from "../ActivityCertificateNoticeFrame";

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 40px;
  align-self: stretch;
`;

const ActivityCertificateInfoSecondFrame: React.FC<
  ActivityCertificateFrameProps
> = () => (
  <StyledCard type="outline">
    <Typography type="p">Temp2</Typography>
  </StyledCard>
);

export default ActivityCertificateInfoSecondFrame;
