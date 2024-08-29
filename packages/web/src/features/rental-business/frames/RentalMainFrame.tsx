import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import RentalInfoFrame from "@sparcs-clubs/web/features/rental-business/frames/RentalInfoFrame";

import RentalNoticeFrame from "./RentalNoticeFrame";

import type { RentalInterface } from "../types/rental";

const RentalMainFrame: React.FC = () => {
  const [rental, setRental] = React.useState<RentalInterface>({
    agreement: false,
  });
  const props = { rental, setRental };
  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "대여 사업", path: "/rental-business" }]}
        title="대여 사업"
      />
      {rental.agreement ? (
        <RentalInfoFrame {...props} />
      ) : (
        <RentalNoticeFrame {...props} />
      )}
    </FlexWrapper>
  );
};

export default RentalMainFrame;
