"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import ErrorPageTemplate from "@sparcs-clubs/web/common/frames/ErrorPageTemplate";

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

const NoManageClubForExecutive: NextPage = () => {
  const router = useRouter();

  const Message = (
    <ErrorMessage>집행부원은 동아리 등록이 불가능합니다.</ErrorMessage>
  );

  const goToMain = () => {
    router.push("/");
  };

  return (
    <ErrorPageTemplate
      message={Message}
      buttons={[{ text: "메인 바로가기", onClick: goToMain }]}
    />
  );
};

export default NoManageClubForExecutive;
