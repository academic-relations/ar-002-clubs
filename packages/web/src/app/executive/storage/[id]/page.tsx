"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import Custom404 from "@sparcs-clubs/web/app/not-found";
import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import LoginRequired from "@sparcs-clubs/web/common/frames/LoginRequired";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
// import ExecutiveStorageApproveFrame from "@sparcs-clubs/web/features/executive/storage/frames/ExecutiveStorageApproveFrame";
import ExecutiveStorageApproveFrame from "@sparcs-clubs/web/features/executive/storage/frames/ExecutiveStorageApproveFrame";
import ExecutiveStorageDetailFrame from "@sparcs-clubs/web/features/executive/storage/frames/ExecutiveStorageDetailFrame";

const ExecutiveStorageDetail: React.FC = () => {
  const { isLoggedIn, login, profile } = useAuth();
  const [loading, setLoading] = useState(true);

  const { id: applicationId } = useParams();

  useEffect(() => {
    if (isLoggedIn !== undefined || profile !== undefined) {
      setLoading(false);
    }
  }, [isLoggedIn, profile]);

  if (loading) {
    return <AsyncBoundary isLoading={loading} isError />;
  }

  if (!isLoggedIn) {
    return <LoginRequired login={login} />;
  }

  if (profile?.type !== "executive") {
    return <Custom404 />;
  }

  return (
    <FlexWrapper gap={40} direction="column">
      <PageHead
        items={[
          { name: "집행부원 대시보드", path: "/executive" },
          { name: "창고 사용 신청 내역", path: "/executive/storage" },
        ]}
        title="창고 사용 신청 내역"
        enableLast
      />
      <ExecutiveStorageDetailFrame applicationId={+applicationId} />
      <ExecutiveStorageApproveFrame applicationId={+applicationId} />
      <Link href="/executive/storage">
        <Button>목록으로 돌아가기</Button>
      </Link>
    </FlexWrapper>
  );
};

export default ExecutiveStorageDetail;
