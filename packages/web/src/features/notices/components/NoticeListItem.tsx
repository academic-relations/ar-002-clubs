"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import styled from "styled-components";

import clubsLogoSvg from "@sparcs-clubs/web/assets/logo-icon.svg";

interface NoticeListItemProps {
  title: string;
  date: Date;
}

const NoticeListItemInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  column-gap: 20px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    flex-direction: column;
    column-gap: 4px;
    justify-content: flex-start;
  }
`;

const NoticeIconAndTitle = styled.div`
  // NoticeListItemInner의 item으로서의 속성
  // Date 와 gap 이외의 나머지 공간을 전부 채웁니다.
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
  // NoticeIcon, NoticeTitleWrppaer 의 flex-container로서의 속성
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  column-gap: 12px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    width: 100%;
    justify-content: flex-start;
  }
`;

// 공지사항별 아이콘이 표기되야 하는 구역입니다.
const NoticeIconWrapper = styled.div`
  flex-basis: 32px;
  height: 32px;
  flex-grow: 0;
  flex-shrink: 0;
`;

const NoticeTitleWrapper = styled.div`
  flex-grow: 1;
  height: 24px;
  color: ${({ theme }) => theme.colors.BLACK};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  font-size: 16px;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    width: 100%;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
  }
`;

const NoticeDate = styled.div<{ date: Date }>`
  width: 100px;
  flex-grow: 0;
  flex-shrink: 0;
  height: 24px;
  color: ${({ theme }) => theme.colors.BLACK};
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  overflow: hidden;
  display: inline-block;
  &::after {
    content: "${({ date }) =>
      date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })}";
  }
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 12px;
    line-height: 16px;
    width: 100%;
    height: 16px;
    text-align: left;
    justify-content: flex-start;
    &::after {
      content: "${({ date }) =>
        date.toLocaleDateString("ko-KR", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })}";
    }
  }
`;

const NoticeListItem: React.FC<NoticeListItemProps> = ({ title, date }) => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 720);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <NoticeListItemInner>
      <NoticeIconAndTitle>
        {!isMobileView && (
          <NoticeIconWrapper>
            <Image src={clubsLogoSvg} alt="clubs-logo" />
          </NoticeIconWrapper>
        )}
        <NoticeTitleWrapper>{title}</NoticeTitleWrapper>
      </NoticeIconAndTitle>
      <NoticeDate date={date} />
    </NoticeListItemInner>
  );
};

export default NoticeListItem;
