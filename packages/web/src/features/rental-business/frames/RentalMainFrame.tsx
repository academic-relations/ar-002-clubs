import React from "react";
import styled from "styled-components";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import RentalInfoFrame from "@sparcs-clubs/web/features/rental-business/frames/RentalInfoFrame";
import type { RentalInterface } from "../types/rental";
import RentalNoticeFrame from "./RentalNoticeFrame";

const RentalMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const RentalMainFrame: React.FC = () => {
  const [rental, setRental] = React.useState<RentalInterface>({
    agreement: false,
  });
  const props = { rental, setRental };
  return (
    <RentalMainFrameInner>
      <PageHead
        items={[{ name: "대여 사업", path: "/rental-business" }]}
        title="대여 사업"
      />
      {rental.agreement ? (
        <RentalInfoFrame {...props} />
      ) : (
        <RentalNoticeFrame {...props} />
      )}
    </RentalMainFrameInner>
  );
};

export default RentalMainFrame;
