"use client";

import React from "react";

import Link from "next/link";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import {
  noticeItemCount,
  noticePageOffset,
} from "@sparcs-clubs/web/constants/mainPage";
import { useGetNotice } from "@sparcs-clubs/web/features/notices/services/useGetNotice";

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

const NoticeSectionFrame: React.FC = () => {
  const { data, isLoading, isError } = useGetNotice(
    noticePageOffset,
    noticeItemCount,
  );

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <NoticeSectionFrameInner>
        <MoreSectionTitle title="공지사항" />
        <NoticeWrapper>
          {data?.notices.map(noticeInfo => (
            <Link
              key={noticeInfo.id}
              href={
                noticeInfo.link
              } /* TODO - 각 notice에 따른 올바른 path로 수정 바람 --> paths.NOTICE.path + "/" + noticeInfo.id.toString() */
              style={{ display: "flex", flexDirection: "column" }}
            >
              <NoticeCard noticeList={noticeInfo} />
            </Link>
          ))}
        </NoticeWrapper>
      </NoticeSectionFrameInner>
    </AsyncBoundary>
  );
};

export default NoticeSectionFrame;
