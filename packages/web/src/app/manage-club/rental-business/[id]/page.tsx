"use client";

import React from "react";

import { useRouter } from "next/navigation";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import { Status } from "@sparcs-clubs/web/common/components/ProgressCheckSection/_atomic/ProgressDot";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import ManageRentalDetailFrame from "@sparcs-clubs/web/features/manage-club/rental/frame/ManageRentalDetailFrame";

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
        <ProgressStatus
          labels={[
            "신청 완료",
            "동아리 연합회 승인 대기",
            "대여 대기",
            "반납 대기",
          ]}
          progress={[{ status: Status.Approved, date: new Date() }]}
          infoText="승인이 완료되기 전까지 신청을 취소할 수 있습니다"
          optional={<Button style={{ width: "max-content" }}>신청 취소</Button>}
        />
        <ManageRentalDetailFrame />
      </Card>
      <Button style={{ width: "max-content" }} onClick={onClick}>
        목록으로 돌아가기
      </Button>
    </FlexWrapper>
  );
};
export default ManageRentalDetail;
