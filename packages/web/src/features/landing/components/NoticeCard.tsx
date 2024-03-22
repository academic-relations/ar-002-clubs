"use client";

import React from "react";
import styled from "styled-components";
import { NoticeInfo } from "@sparcs-clubs/web/features/notice/types/notice.type";

const NoticeCardInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-left: 28px;
`;

const NoticeTitle = styled.div`
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoticeDate = styled.div`
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  white-space: nowrap;
`;

const NoticeCard: React.FC<{ noticeList: NoticeInfo }> = ({ noticeList }) => (
  <NoticeCardInner>
    <NoticeTitle>{noticeList.title}</NoticeTitle>
    <NoticeDate>{noticeList.date}</NoticeDate>
  </NoticeCardInner>
);

export default NoticeCard;
