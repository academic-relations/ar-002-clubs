import React from "react";
import styled from "styled-components";
import colors from "@sparcs-clubs/web/styles/themes/colors";
import TextButton from "../TextButton";
import Icon from "../Icon";

type CellTagColor = "GREEN" | "BLUE" | "ORANGE" | "PURPLE" | "RED" | "GRAY";

interface TableCellProps {
  type:
    | "Default"
    | "None"
    | "Tag"
    | "Button"
    | "Buttons"
    | "Header"
    | "HeaderSort";
  text: string;
  secondText?: string;
  onClickFirst?: () => void;
  onClickSecond?: () => void;
  color?: CellTagColor;
  width?: string | number;
  minWidth?: number;
}

const CommonCellWrapper = styled.div<{
  isHeader: boolean;
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
  background-color: ${({ theme, isHeader }) =>
    isHeader ? theme.colors.PRIMARY : "transparent"};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const CellText = styled.div<{ isGray: boolean }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ isGray, theme }) =>
    isGray ? theme.colors.GRAY[300] : theme.colors.BLACK};
`;

const CellTagInner = styled.div<{ color: CellTagColor }>`
  position: relative;
  padding: 4px 12px;
  font-size: 14px;
  line-height: 16px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme, color }) =>
    color === "RED" ? theme.colors.WHITE : theme.colors[color][600]};
  background-color: ${({ theme, color }) =>
    color === "RED" ? theme.colors.RED[600] : theme.colors[color][200]};
  border-radius: ${({ theme }) => theme.round.sm};
`;

const HeaderInner = styled.div`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.WHITE};
`;

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0px;
  padding-left: 20px;
`;

const TableCell: React.FC<TableCellProps> = ({
  type,
  text,
  secondText = "",
  onClickFirst = () => {},
  onClickSecond = () => {},
  color = "BLUE",
  width = "150px",
  minWidth = 150,
}) => (
  <CommonCellWrapper
    width={width}
    minWidth={minWidth}
    isHeader={type === "Header" || type === "HeaderSort"}
  >
    {type === "Default" && <CellText isGray={false}>{text}</CellText>}
    {type === "None" && <CellText isGray>{text}</CellText>}
    {type === "Tag" && <CellTagInner color={color}>{text}</CellTagInner>}
    {type === "Button" && <TextButton text={text} onClick={onClickFirst} />}
    {type === "Buttons" && (
      <ButtonsWrapper>
        <TextButton text={text} onClick={onClickFirst} />
        <CellText isGray>/</CellText>
        <TextButton text={secondText} onClick={onClickSecond} />
      </ButtonsWrapper>
    )}
    {type === "Header" && <HeaderInner>{text}</HeaderInner>}
    {type === "HeaderSort" && (
      <SortWrapper>
        <HeaderInner>{text}</HeaderInner>
        <Icon type="arrow_drop_down" size={24} color={colors.WHITE} />
      </SortWrapper>
    )}
  </CommonCellWrapper>
);

export default TableCell;
