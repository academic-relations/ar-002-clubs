"use client";

import React from "react";
import styled from "styled-components";

const DescriptionRowInner = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DescriptionRow: React.FC<React.PropsWithChildren> = ({
  children = <div />,
}) => <DescriptionRowInner>{children}</DescriptionRowInner>;

export default DescriptionRow;
