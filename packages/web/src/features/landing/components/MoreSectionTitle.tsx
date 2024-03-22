"use client";

import React from "react";
import styled from "styled-components";

import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Link from "next/link";
import paths from "@sparcs-clubs/web/constants/paths";

const MoreSectionTitleInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const MoreInfo = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  text-decoration-line: underline;
  cursor: pointer;
`;

const MoreSectionTitle: React.FC<{
  title: string;
  showMore?: boolean;
}> = ({ title, showMore = true }) => (
  <MoreSectionTitleInner>
    <SectionTitle size="lg">{title}</SectionTitle>
    {showMore && (
      <Link
        href={
          paths.HOME.path
        } /* 추후 올바른 path로 수정 바람 --> paths.NOTICE.path */
        style={{ display: "flex", flexDirection: "column" }}
      >
        <MoreInfo>글 더보기</MoreInfo>
      </Link>
    )}
  </MoreSectionTitleInner>
);

export default MoreSectionTitle;
