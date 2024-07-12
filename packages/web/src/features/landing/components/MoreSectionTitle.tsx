"use client";

import React from "react";

import Link from "next/link";
import styled from "styled-components";

import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
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
    <SectionTitle size="sm">{title}</SectionTitle>
    {showMore && (
      <Link
        href={paths.CLUBS.sub[1].path}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <MoreInfo>글 더보기</MoreInfo>
      </Link>
    )}
  </MoreSectionTitleInner>
);

export default MoreSectionTitle;
