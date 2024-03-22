"use client";

import React from "react";
import styled from "styled-components";
import { NoticeInfo } from "@sparcs-clubs/web/features/notice/types/notice.type";
import MoreSectionTitle from "../components/MoreSectionTitle";
import NoticeCard from "../components/NoticeCard";

const NoticeSectionFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
`;

type NoticeSectionFrameProps = {
  noticeList: Array<NoticeInfo>;
};

const NoticeSectionFrame: React.FC<NoticeSectionFrameProps> = ({
  noticeList,
}) => (
  <NoticeSectionFrameInner>
    <MoreSectionTitle title="동아리" />
    {noticeList.map(noticeInfo => (
      <NoticeCard noticeList={noticeInfo} />
    ))}
  </NoticeSectionFrameInner>
);

export default NoticeSectionFrame;
