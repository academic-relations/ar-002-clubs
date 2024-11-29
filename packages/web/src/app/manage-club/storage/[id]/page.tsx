"use client";

import React from "react";

import { StorageStatusEnum } from "@sparcs-clubs/interface/common/enum/storage.enum";
import { useRouter } from "next/navigation";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ManageStorageProgress from "@sparcs-clubs/web/features/manage-club/storage/components/ManageStorageProgress";
import ManageStorageDetailFrame from "@sparcs-clubs/web/features/manage-club/storage/frames/ManageStorageDetailFrame";

const ManageStorageDetail = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/manage-club/storage");
  };
  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          {
            name: "창고 사용 신청",
            path: "/manage-club/storage",
          },
        ]}
        title="창고 사용 신청"
        enableLast
      />
      <Card outline gap={20}>
        <ManageStorageProgress status={StorageStatusEnum.Received} />
        <ManageStorageDetailFrame />
      </Card>
      <Button style={{ width: "max-content" }} onClick={onClick}>
        목록으로 돌아가기
      </Button>
    </FlexWrapper>
  );
};

export default ManageStorageDetail;
