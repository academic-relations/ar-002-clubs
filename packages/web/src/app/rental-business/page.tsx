"use client";

import React from "react";
import { useForm } from "react-hook-form";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import RentalInfoFrame from "@sparcs-clubs/web/features/rental-business/frames/RentalInfoFrame";
import RentalNoticeFrame from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";
import type { RentalInterface } from "@sparcs-clubs/web/features/rental-business/types/rental";

const RentalBusiness: React.FC = () => {
  const formCtx = useForm<RentalInterface>({ mode: "all" });

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "대여 사업", path: "/rental-business" }]}
        title="대여 사업"
      />
      {formCtx.watch("agreement") ? (
        <RentalInfoFrame formCtx={formCtx} />
      ) : (
        <RentalNoticeFrame formCtx={formCtx} />
      )}
    </FlexWrapper>
  );
};

export default RentalBusiness;
