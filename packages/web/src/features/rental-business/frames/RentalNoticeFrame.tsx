import Card from "@sparcs-clubs/web/common/components/Card";
import React from "react";
import styled from "styled-components";

interface RentalNoticeFrameProps {
  prop: string;
}

const RentalNoticeFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const RentalNoticeFrame: React.FC<RentalNoticeFrameProps> = ({ prop }) => (
  <RentalNoticeFrameInner>
    <Card>{prop}</Card>
  </RentalNoticeFrameInner>
);

export default RentalNoticeFrame;
