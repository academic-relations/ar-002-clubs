import React from "react";
import styled from "styled-components";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import BreadCrumb from "./_atomic/BreadCrumb";

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
