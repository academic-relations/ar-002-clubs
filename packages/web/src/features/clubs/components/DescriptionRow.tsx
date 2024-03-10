"use client";

import React from "react";
import styled from "styled-components";

const DescriptionRowInner = styled.div`
  width: 209px;
  height: 20px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const DescriptionRow: React.FC<React.PropsWithChildren> = ({
  children = <div />,
}) => <DescriptionRowInner>{children}</DescriptionRowInner>;

export default DescriptionRow;
