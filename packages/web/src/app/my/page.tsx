"use client";

import React, { useEffect, useState } from "react";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import LoginRequired from "@sparcs-clubs/web/common/frames/LoginRequired";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
// import { MyChangesFrame } from "@sparcs-clubs/web/features/my/frames/MyChangesFrame";
import MyClubFrame from "@sparcs-clubs/web/features/my/frames/MyClubFrame";
import MyInfoFrame from "@sparcs-clubs/web/features/my/frames/MyInfoFrame";
import MyRegisterFrame from "@sparcs-clubs/web/features/my/frames/MyRegisterFrame";
import ProfessorMyClubFrame from "@sparcs-clubs/web/features/my/frames/ProfessorMyClubFrame";
// import MyServiceFrame from "@sparcs-clubs/web/features/my/frames/MyServiceFrame";

const ResponsiveWrapper = styled(FlexWrapper)`
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    gap: 40px;
  }
`;

const My: React.FC = () => {
  const { isLoggedIn, login, profile } = useAuth();
  const [loading, setLoading] = useState(true);

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

  return (
    <ResponsiveWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "마이페이지", path: "/my" }]}
        title="마이페이지"
      />
      {/* {profile === "undergraduate" && <MyChangesFrame />} */}
      <MyInfoFrame profile={profile as string} />
      {profile !== "executive" &&
        (profile === "professor" ? <ProfessorMyClubFrame /> : <MyClubFrame />)}
      {profile && profile !== "executive" && (
        <MyRegisterFrame profile={profile} />
      )}
      {/* {(profile === "undergraduate" ||
        profile === "master" ||
        profile === "doctor") && <MyServiceFrame />} */}
    </ResponsiveWrapper>
  );
};

export default My;
