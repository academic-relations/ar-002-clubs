"use client";

import React from "react";

import styled from "styled-components";

import type { ApiNtc001ResponseOK } from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc001";

const NoticeCardInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const NoticeTitle = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoticeDate = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  white-space: nowrap;
`;

const NoticeCard: React.FC<{
  noticeList: ApiNtc001ResponseOK["notices"][number];
}> = ({ noticeList }) => (
  <NoticeCardInner>
    <NoticeTitle>{noticeList.title}</NoticeTitle>
    <NoticeDate>
      {noticeList.date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })}
    </NoticeDate>
  </NoticeCardInner>
);

export default NoticeCard;
