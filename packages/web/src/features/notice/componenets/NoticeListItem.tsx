"use client";

import React from "react";
import styled from "styled-components";

const NoticeListItemInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 20px;
`;

const NoticeIconAndTitle = styled.div`
  width: calc(100% - 84px - 20px);
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 12px;
`;

// 공지사항별 아이콘이 표기되야 하는 구역입니다.
const NoticeIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: gray;
`;

const NoticeTitleWrppaer = styled.div`
  width: calc(100% - 32px - 12px);
  height: 24px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoticeDate = styled.div`
  flex-basis: 84px;
  width: 84px;
  height: 24px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: left;
  overflow: hidden;
`;

interface NoticeListItemProps {
  title: string;
  date: string;
}

const NoticeListItem: React.FC<NoticeListItemProps> = ({ title, date }) => (
  <NoticeListItemInner>
    <NoticeIconAndTitle>
      <NoticeIcon />
      <NoticeTitleWrppaer>{title}</NoticeTitleWrppaer>
    </NoticeIconAndTitle>
    <NoticeDate>{date}</NoticeDate>
  </NoticeListItemInner>
);

export default NoticeListItem;
