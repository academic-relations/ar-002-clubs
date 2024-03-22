"use client";

import React from "react";
import styled from "styled-components";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import colors from "@sparcs-clubs/web/styles/themes/colors";

import NoticeSectionFrame from "./NoticeSectionFrame";
import ServiceSectionFrame from "./ServiceSectionFrame";

const MainPageMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const PageTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoticeAndServiceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

interface MainPageMainFrameProps {
  title: string;
}

const MainPageMainFrame: React.FC<MainPageMainFrameProps> = ({ title }) => (
  <MainPageMainFrameInner>
    <PageTitleWrapper>
      <PageTitle>
        <span style={{ color: colors.PRIMARY }}>동아리</span>의 모든 것을 한번에
      </PageTitle>
      <PageTitle>
        동아리연합회 통합 플랫폼,{" "}
        <span style={{ color: colors.PRIMARY }}>Clubs</span>입니다
      </PageTitle>
    </PageTitleWrapper>

    <NoticeAndServiceWrapper>
      <NoticeSectionFrame title={title} />
      <ServiceSectionFrame title={title} />
    </NoticeAndServiceWrapper>
  </MainPageMainFrameInner>
);

export default MainPageMainFrame;
