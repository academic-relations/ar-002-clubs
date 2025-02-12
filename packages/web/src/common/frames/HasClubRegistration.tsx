"use client";

import { useRouter } from "next/navigation";
import React from "react";
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

const HasClubRegistration: React.FC<{ applyId: number }> = ({ applyId }) => {
  const router = useRouter();

  const Message = (
    <ErrorMessage>
      동아리 등록 신청 내역이 이미 존재하여 <br />
      추가로 신청할 수 없습니다
    </ErrorMessage>
  );

  const goToMain = () => {
    router.push("/");
  };

  return (
    <ErrorPageTemplate
      message={Message}
      buttons={[
        { text: "메인 바로가기", onClick: goToMain },
        {
          text: "동아리 등록 신청 내역 바로가기",
          onClick: () => router.push(`/my/register-club/${applyId}`),
        },
      ]}
    />
  );
};

export default HasClubRegistration;
