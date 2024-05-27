import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import RentalInfoFrame from "@sparcs-clubs/web/features/rental-business/frames/RentalInfoFrame";
import React from "react";
import styled from "styled-components";

import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";
import type { RentalInterface } from "../types/rental";
import RentalNoticeFrame from "./RentalNoticeFrame";

const RentalMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RentalMainFrame: React.FC = () => {
  const [rental, setRental] = React.useState<RentalInterface>({
    agreement: false,
  });
  const props = { rental, setRental };
  return (
    <RentalMainFrameInner>
      <PageHeadWrapper>
        <BreadCrumb items={[{ name: "대여 사업", path: "/rental-business" }]} />
        <PageTitle>대여 사업</PageTitle>
      </PageHeadWrapper>
      {rental.agreement ? (
        <RentalInfoFrame {...props} />
      ) : (
        <RentalNoticeFrame {...props} />
      )}
    </RentalMainFrameInner>
  );
};

export default RentalMainFrame;
