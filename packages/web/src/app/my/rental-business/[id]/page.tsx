"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import RentalProgress from "@sparcs-clubs/web/features/rental-business/components/RentalProgress";
import RentalDetailFrame from "@sparcs-clubs/web/features/rental-business/frames/RentalDetailFrame";

const MyRentalDetail = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/my/rental-business");
  };
  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "마이페이지", path: "/my" },
          {
            name: "대여 사업 신청 내역",
            path: "/my/rental-business",
          },
        ]}
        title="대여 사업 신청 내역"
        enableLast
      />
      <Card outline gap={20}>
        <RentalProgress status={RentalOrderStatusEnum.Rejected} />
        <RentalDetailFrame />
      </Card>
      <Button style={{ width: "max-content" }} onClick={onClick}>
        목록으로 돌아가기
      </Button>
    </FlexWrapper>
  );
};
export default MyRentalDetail;
