"use client";

import React from "react";

import Image from "next/image";

import styled from "styled-components";

import logoImg from "@sparcs-clubs/web/assets/only-logo.svg";

import Button from "../components/Button";
import Typography from "../components/Typography";

export interface ErrorPageTemplateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message?: React.ReactNode;
  buttons?: { text: string; onClick: () => void }[];
}

/* 24.08.22. : message로 넘길 Node 예시
const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 32px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  line-height: 48px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 28px;
  }
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xs}) {
    font-size: 20px;
    line-height: 32px;
  }
`;
*/

const ResponsiveWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 105px - 160px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
  position: relative;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    min-height: calc(100vh - 105px - 80px);
  }
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    min-height: calc(100vh - 105px - 40px);
  }
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xs}) {
    align-self: stretch;
  }
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: absolute;
  opacity: 1;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: wrap;
`;

const LogoFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 0px;
  position: absolute;
  opacity: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 385px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    height: 283px;
  }
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xs}) {
    height: 183px;
  }
`;

const LogoImage = styled(Image)`
  width: 600px;
  height: 450px;
  flex-shrink: 0;
  opacity: 0.3;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    width: 438px;
    height: 329px;
  }
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xs}) {
    width: 284px;
    height: 213px;
  }
`;

const BufferDiv = styled.div`
  width: 100%;
  height: 65px;
  background-color: rgba(255, 0, 0, 0.5);
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    height: 56px;
  }
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xs}) {
    height: 30px;
  }
`;

const ErrorPageTemplate: React.FC<ErrorPageTemplateProps> = ({
  message = <Typography>&nbsp;</Typography>,
  buttons = [],
}) => (
  <ResponsiveWrapper>
    <ContentsWrapper>
      {message}
      <ButtonsWrapper>
        {buttons.map((button: { text: string; onClick: () => void }, index) => (
          <Button key={`${index.toString()}`} onClick={button.onClick}>
            {button.text}
          </Button>
        ))}
      </ButtonsWrapper>
    </ContentsWrapper>
    <LogoFrame>
      <BufferDiv />
      <LogoImage src={logoImg} alt="Clubs Logo" />
    </LogoFrame>
  </ResponsiveWrapper>
);

export default ErrorPageTemplate;
