// @eel width를 넘는 텍스트에 대해 좌우로 스크롤되는 텍스트 컴포넌트
// ClubCard에서 사용될 목적으로 개발되었지만 실제로 사용되지 않았음

import React, { useRef } from "react";
// import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import fonts from "@sparcs-clubs/web/styles/themes/fonts";

const ScrollingTextWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

const ScrollingTextContent = styled.div<{
  shouldScroll: boolean;
  isMobile: boolean;
}>`
  display: inline-block;
  white-space: nowrap;
  font-size: ${({ isMobile }) => (isMobile ? "16px" : "20px")};
  line-height: ${({ isMobile }) => (isMobile ? "20px" : "24px")};
  font-weight: ${fonts.WEIGHT.MEDIUM};
  ${({ shouldScroll }) =>
    shouldScroll &&
    `
    display: flex;
    gap: 20px;
    animation: scroll-text 10s linear infinite;
  `}

  @keyframes scroll-text {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const ScrollingText: React.FC<{ isMobile: boolean; children: string }> = ({
  isMobile,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const shouldScroll = true;

  // width가 길 경우에만 스크롤되는 로직
  //   const [shouldScroll, setShouldScroll] = useState(false);

  //   useEffect(() => {
  //     if (wrapperRef.current && contentRef.current) {
  //       const wrapperWidth = wrapperRef.current.offsetWidth;
  //       const contentWidth = contentRef.current.offsetWidth;

  //       setShouldScroll(contentWidth > wrapperWidth);
  //     }
  //   }, [children]);

  return (
    <ScrollingTextWrapper ref={wrapperRef}>
      <ScrollingTextContent
        ref={contentRef}
        shouldScroll={shouldScroll}
        isMobile={isMobile}
      >
        {children}
        {shouldScroll && (
          <div style={{ fontWeight: fonts.WEIGHT.MEDIUM }}>{children}</div>
        )}
        {shouldScroll && (
          <div style={{ fontWeight: fonts.WEIGHT.MEDIUM }}>{children}</div>
        )}
        {shouldScroll && (
          <div style={{ fontWeight: fonts.WEIGHT.MEDIUM }}>{children}</div>
        )}{" "}
        {shouldScroll && (
          <div style={{ fontWeight: fonts.WEIGHT.MEDIUM }}>{children}</div>
        )}
        {shouldScroll && (
          <div style={{ fontWeight: fonts.WEIGHT.MEDIUM }}>{children}</div>
        )}
        {shouldScroll && (
          <div style={{ fontWeight: fonts.WEIGHT.MEDIUM }}>{children}</div>
        )}
      </ScrollingTextContent>
    </ScrollingTextWrapper>
  );
};

export default ScrollingText;
