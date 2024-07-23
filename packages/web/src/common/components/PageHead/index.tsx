import React from "react";

import styled from "styled-components";

import BreadCrumb from "./_atomic/BreadCrumb";
import PageTitle from "./_atomic/PageTitle";

interface PageHeadProps {
  items: { name: string; path: string }[];
  title: string;
  enableLast?: boolean;
}

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  align-self: stretch;
`;

const PageHead: React.FC<PageHeadProps> = ({
  items,
  title,
  enableLast = false,
}) => (
  <PageHeadWrapper>
    <BreadCrumb items={items} enableLast={enableLast} />
    <PageTitle>{title}</PageTitle>
  </PageHeadWrapper>
);

export default PageHead;
