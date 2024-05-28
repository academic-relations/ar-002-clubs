import React from "react";
import styled from "styled-components";

import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";

interface PageHeadProps {
  items: { name: string; path: string }[];
  title: string;
  enableLast?: boolean;
}

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
