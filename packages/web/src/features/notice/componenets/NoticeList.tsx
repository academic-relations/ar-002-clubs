"use client";

import React from "react";
import styled from "styled-components";

import NoticeListItem from "@sparcs-clubs/web/features/notice/componenets/NoticeListItem";
import type { NoticeInfo } from "@sparcs-clubs/web/features/notice/types/notice.type";

const NoticeListInner = styled.div`
  width: 100%;
  height: calc(100% - 41px);
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.BLACK};
  display: flex;
  flex-direction: column;
`;

const NoticeListItemWrapper = styled.div`
  flex-grow: 1;
  min-height: 48px;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.GRAY};
  padding: 8px;
`;

interface NoticeListProps {
  infos: Array<NoticeInfo>;
}

const NoticeList: React.FC<NoticeListProps> = ({ infos }) => (
  <NoticeListInner>
    {infos.map(noticeInfo => (
      <NoticeListItemWrapper key={noticeInfo.id}>
        <NoticeListItem title={noticeInfo.title} date={noticeInfo.date} />
      </NoticeListItemWrapper>
    ))}
  </NoticeListInner>
);

export default NoticeList;
