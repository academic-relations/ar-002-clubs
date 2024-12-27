"use client";

import React from "react";

import { useParams, useRouter } from "next/navigation";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ManageStorageDetailFrame from "@sparcs-clubs/web/features/manage-club/storage/frames/ManageStorageDetailFrame";

const ManageStorageDetail = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/manage-club/storage");
  };

  const { id: applicationId } = useParams();

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

      <ManageStorageDetailFrame applicationId={+applicationId} />

      <Button style={{ width: "max-content" }} onClick={onClick}>
        목록으로 돌아가기
      </Button>
    </FlexWrapper>
  );
};

export default ManageStorageDetail;
