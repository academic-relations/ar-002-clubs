"use client";

import styled from "styled-components";

import ErrorPageTemplate from "@sparcs-clubs/web/common/frames/ErrorPageTemplate";

import type { NextPage } from "next";

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 32px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  line-height: 48px;
  word-break: keep-all;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 28px;
  }
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xs}) {
    font-size: 20px;
    line-height: 32px;
  }
`;

const LoginRequired: NextPage = () => {
  // ToDo : 버튼 onClick 연결
  const Message = (
    <ErrorMessage>
      현재 접근한 페이지는
      <br />
      로그인해야 볼 수 있습니다
    </ErrorMessage>
  );
  return (
    <ErrorPageTemplate
      message={Message}
      buttons={[{ text: "로그인 바로가기", onClick: () => {} }]}
    />
  );
};

export default LoginRequired;
