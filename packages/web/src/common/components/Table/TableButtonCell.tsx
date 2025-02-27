import isPropValid from "@emotion/is-prop-valid";
import React from "react";
import styled from "styled-components";

import TextButton from "../Buttons/TextButton";
import FlexWrapper from "../FlexWrapper";

interface TableButtonCellProps {
  text: string[];
  onClick: (() => void)[];
  width?: string | number;
  minWidth?: number;
}

const CommonCellWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  width: string | number;
  minWidth: number;
}>`
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  min-width: ${({ width }) => `${width}px`};
  display: flex;
  justify-content: center;
  height: 48px;
  padding: 12px 8px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
`;

const CellText = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isGray: boolean }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ isGray, theme }) =>
    isGray ? theme.colors.GRAY[300] : theme.colors.BLACK};
`;

const TableButtonCell: React.FC<TableButtonCellProps> = ({
  text,
  onClick,
  width = "150px",
  minWidth = 100,
}) => (
  <CommonCellWrapper width={width} minWidth={minWidth}>
    <FlexWrapper direction="row" gap={12}>
      {text.map((item, index) => (
        <React.Fragment key={item}>
          <TextButton text={item} onClick={onClick[index]} />
          {index < text.length - 1 && <CellText isGray>/</CellText>}
        </React.Fragment>
      ))}
    </FlexWrapper>
  </CommonCellWrapper>
);

export default TableButtonCell;
