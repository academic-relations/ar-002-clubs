"use client";

import React from "react";

import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";
import { useRouter } from "next/navigation";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ManageRentalProgress from "@sparcs-clubs/web/features/manage-club/rental/components/ManageRentalProgress";
import ManageRentalDetailFrame from "@sparcs-clubs/web/features/manage-club/rental/frames/ManageRentalDetailFrame";

const ManageRentalDetail = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/manage-club/rental-business");
  };
  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          {
            name: "대여 사업 신청 내역",
            path: "/manage-club/rental-business",
          },
        ]}
        title="대여 사업 신청 내역"
        enableLast
      />
      <Card outline gap={20}>
        <ManageRentalProgress status={RentalOrderStatusEnum.Overdue} />
        <ManageRentalDetailFrame />
      </Card>
      <Button style={{ width: "max-content" }} onClick={onClick}>
        목록으로 돌아가기
      </Button>
    </FlexWrapper>
  );
};
export default ManageRentalDetail;
