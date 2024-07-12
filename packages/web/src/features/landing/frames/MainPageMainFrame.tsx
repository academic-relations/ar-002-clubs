"use client";

import React from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import colors from "@sparcs-clubs/web/styles/themes/colors";

import NoticeSectionFrame from "./NoticeSectionFrame";
import ServiceSectionFrame from "./ServiceSectionFrame";

const PageTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoticeAndServiceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    flex-direction: column;
  }
`;

const MainPageMainFrame: React.FC = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageTitleWrapper>
      <Typography
        ff="PRETENDARD"
        fs={32}
        lh={48}
        fw="SEMIBOLD"
        color="BLACK"
        style={{ width: "fit-content" }}
      >
        <span style={{ color: colors.PRIMARY }}>동아리</span>의 모든 것을 한번에
      </Typography>
      <Typography
        ff="PRETENDARD"
        fs={32}
        lh={48}
        fw="SEMIBOLD"
        color="BLACK"
        style={{ width: "fit-content" }}
      >
        동아리연합회 통합 플랫폼,{" "}
        <span style={{ color: colors.PRIMARY }}>Clubs</span>입니다
      </Typography>
    </PageTitleWrapper>

    <NoticeAndServiceWrapper>
      <NoticeSectionFrame />
      <ServiceSectionFrame />
    </NoticeAndServiceWrapper>
  </FlexWrapper>
);

export default MainPageMainFrame;
