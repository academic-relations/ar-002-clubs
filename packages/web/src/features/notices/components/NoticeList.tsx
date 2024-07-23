"use client";

import React from "react";

import Link from "next/link";
import styled from "styled-components";

import NoticeListItem from "@sparcs-clubs/web/features/notices/components/NoticeListItem";

import type { ApiNtc001ResponseOK } from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc001";

interface NoticeListProps {
  infos: ApiNtc001ResponseOK["notices"];
}

const NoticeListInner = styled.div`
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.GRAY[200]};
  display: flex;
  flex-direction: column;
`;

const NoticeListItemWrapper = styled(Link)`
  flex-grow: 1;
  min-height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  padding: 8px;
`;

const NoticeList: React.FC<NoticeListProps> = ({ infos }) => (
  <NoticeListInner>
    {infos.map(noticeInfo => (
      <NoticeListItemWrapper key={noticeInfo.id} href={noticeInfo.link}>
        <NoticeListItem title={noticeInfo.title} date={noticeInfo.date} />
      </NoticeListItemWrapper>
    ))}
  </NoticeListInner>
);

export default NoticeList;

export type { NoticeListProps };
