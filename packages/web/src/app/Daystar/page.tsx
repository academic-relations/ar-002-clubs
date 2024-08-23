"use client";

import React from "react";

import styled from "styled-components";

import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";

const ResponsiveBr = styled.br`
  display: none;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    display: block;
  }
`;

const Daystar: React.FC = () => (
  <CancellableModalContent onClose={() => {}} onConfirm={() => {}}>
    2024학년도 봄학기
    <ResponsiveBr /> 정동아리 술박스 의
    <br />
    회원 등록을 취소합니다.
  </CancellableModalContent>
);

export default Daystar;
