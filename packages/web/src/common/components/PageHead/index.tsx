import React from "react";
import styled from "styled-components";

import BreadCrumb from "./_atomic/BreadCrumb";
import PageTitle from "./_atomic/PageTitle";

interface PageHeadProps {
  items: { name: string; path: string }[];
  title: string;
  enableLast?: boolean;
  action?: React.ReactNode;
}

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    gap: 12px;
  }
  align-items: flex-start;
  align-self: stretch;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const PageHead: React.FC<PageHeadProps> = ({
  items,
  title,
  enableLast = false,
  action = null,
}) => (
  <PageHeadWrapper>
    <BreadCrumb items={items} enableLast={enableLast} />
    <TitleWrapper>
      <PageTitle>{title}</PageTitle>
      {action && <div>{action}</div>}
    </TitleWrapper>
  </PageHeadWrapper>
);

export default PageHead;
