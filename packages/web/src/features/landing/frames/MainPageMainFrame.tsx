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

const StyledSpan = styled.span`
  color: ${colors.PRIMARY};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.SEMIBOLD};
`;

const BreakBeforeStyledSpan = styled.span`
  display: none;
  @media (max-width: 360px) {
    display: block;
  }
`;

const ResponsiveSloganTypography = styled(Typography)`
  font-size: 32px;
  line-height: 48px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    font-size: 28px;
    line-height: 40px;
  }
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 20px;
    line-height: 32px;
  }
`;

const ResponsiveWrapper = styled(FlexWrapper)`
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    gap: 40px;
  }
`;

const MainPageMainFrame: React.FC = () => (
  <ResponsiveWrapper direction="column" gap={60}>
    <PageTitleWrapper>
      <ResponsiveSloganTypography
        fw="SEMIBOLD"
        style={{ width: "fit-content" }}
      >
        <StyledSpan>동아리</StyledSpan>의 모든 것을 한번에
      </ResponsiveSloganTypography>
      <ResponsiveSloganTypography
        fw="SEMIBOLD"
        style={{ width: "fit-content" }}
      >
        동아리연합회 통합 플랫폼, <BreakBeforeStyledSpan />
        <StyledSpan>Clubs</StyledSpan>입니다
      </ResponsiveSloganTypography>
    </PageTitleWrapper>
    <NoticeAndServiceWrapper>
      <NoticeSectionFrame />
      <ServiceSectionFrame />
    </NoticeAndServiceWrapper>
  </ResponsiveWrapper>
);

export default MainPageMainFrame;
