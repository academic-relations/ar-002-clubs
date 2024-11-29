"use client";

import React, { useEffect, useState } from "react";

import Custom404 from "@sparcs-clubs/web/app/not-found";
import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import LoginRequired from "@sparcs-clubs/web/common/frames/LoginRequired";

import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";

import { ExecutiveStorage } from "@sparcs-clubs/web/features/executive/storage/frames/ExecutiveStorageFrame";

/** NOTE: (@dora) 등록 기간 무관하게 항상 볼 수 있는 화면 */
const Storage = () => {
  const { isLoggedIn, login, profile } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn !== undefined || profile !== undefined) {
      setLoading(false);
    }
  }, [isLoggedIn, profile]);

  if (loading) {
    return <AsyncBoundary isLoading={loading} isError={false} />;
  }

  if (!isLoggedIn) {
    return <LoginRequired login={login} />;
  }

  if (profile?.type !== "executive") {
    return <Custom404 />;
  }

  return (
    <FlexWrapper direction="column" gap={20}>
      <PageHead
        items={[
          { name: "집행부원 대시보드", path: "/executive" },
          { name: "창고 사용 신청 내역", path: `/executive/storage` },
        ]}
        title="창고 사용 신청 내역"
      />
      <ExecutiveStorage />
    </FlexWrapper>
  );
};

export default Storage;
