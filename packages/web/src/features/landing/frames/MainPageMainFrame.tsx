"use client";

import React from "react";
import styled from "styled-components";

import { NoticeInfo } from "@sparcs-clubs/web/features/notice/types/notice.type";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import colors from "@sparcs-clubs/web/styles/themes/colors";

import NoticeSectionFrame from "./NoticeSectionFrame";
import ServiceSectionFrame from "./ServiceSectionFrame";

interface MainPageMainFrameProps {
  noticeList: Array<NoticeInfo>;
}

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
  gap: 60px;
`;

const MainPageMainFrame: React.FC<MainPageMainFrameProps> = ({
  noticeList,
}) => (
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
      <NoticeSectionFrame noticeList={noticeList} />
      <ServiceSectionFrame />
    </NoticeAndServiceWrapper>
  </MainPageMainFrameInner>
);

export default MainPageMainFrame;
