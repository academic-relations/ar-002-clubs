import React from "react";

import styled from "styled-components";

import FlexWrapper from "../FlexWrapper";
import TextButton from "../TextButton";

interface TableButtonProps {
  text: string[];
  onClick: (() => void)[];
}

const CellText = styled.div<{ isGray: boolean }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ isGray, theme }) =>
    isGray ? theme.colors.GRAY[300] : theme.colors.BLACK};
`;

const TableButton: React.FC<TableButtonProps> = ({ text, onClick }) => (
  <FlexWrapper direction="row" gap={12}>
    {text.map((item, index) => (
      <React.Fragment key={item}>
        <TextButton text={item} onClick={onClick[index]} />
        {index < text.length - 1 && <CellText isGray>/</CellText>}
      </React.Fragment>
    ))}
  </FlexWrapper>
);

export default TableButton;