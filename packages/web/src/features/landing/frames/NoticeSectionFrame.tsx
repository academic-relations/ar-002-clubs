"use client";

import React from "react";
import styled from "styled-components";
import { NoticeInfo } from "@sparcs-clubs/web/features/notice/types/notice.type";
import Link from "next/link";
import paths from "@sparcs-clubs/web/constants/paths";
import MoreSectionTitle from "../components/MoreSectionTitle";
import NoticeCard from "../components/NoticeCard";

const NoticeSectionFrameInner = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
`;

const NoticeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 24px;
`;

type NoticeSectionFrameProps = {
  noticeList: Array<NoticeInfo>;
};

const NoticeSectionFrame: React.FC<NoticeSectionFrameProps> = ({
  noticeList,
}) => (
  <NoticeSectionFrameInner>
    <MoreSectionTitle title="공지사항" />
    <NoticeWrapper>
      {noticeList.map(noticeInfo => (
        <Link
          key={noticeInfo.id}
          href={
            paths.HOME.path
          } /* TODO - 각 notice에 따른 올바른 path로 수정 바람 --> paths.NOTICE.path + "/" + noticeInfo.id.toString() */
          style={{ display: "flex", flexDirection: "column" }}
        >
          <NoticeCard noticeList={noticeInfo} />
        </Link>
      ))}
    </NoticeWrapper>
  </NoticeSectionFrameInner>
);

export default NoticeSectionFrame;
