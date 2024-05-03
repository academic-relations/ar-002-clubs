import React from "react";
import styled from "styled-components";
import TextButton from "../TextButton";

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
  onClick?: () => void;
  onClickSecond?: () => void;
  color?: CellTagColor;
}

const CommonCellWrapper = styled.div`
  height: 48px;
  padding: 12px 8px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const CellText = styled.div<{ isGray: boolean }>`
  font-size: 16px;
  line-height: 24px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ isGray, theme }) =>
    isGray ? theme.colors.GRAY[300] : theme.colors.BLACK};
`;

const CellTagInner = styled.div<{ color: CellTagColor }>`
  position: relative;
  width: fit-content;
  padding: 4px 12px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 16px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme, color }) =>
    color === "RED" ? theme.colors.WHITE : theme.colors[color][600]};
  background-color: ${({ theme, color }) =>
    color === "RED" ? theme.colors.RED[600] : theme.colors[color][200]};
  border-radius: ${({ theme }) => theme.round.sm};
`;

const TableCell: React.FC<TableCellProps> = ({
  type,
  text,
  secondText = "",
  onClick = () => {},
  onClickSecond = () => {},
  color = "BLUE",
}) => (
  <CommonCellWrapper>
    {type === "Default" && <CellText isGray={false}>default</CellText>}
    {type === "None" && <CellText isGray>None</CellText>}
    {type === "Tag" && <CellTagInner color={color}>{text}</CellTagInner>}
    {type === "Button" && <TextButton text={text} onClick={onClick} />}
    {type === "Buttons" && (
      <ButtonsWrapper>
        <TextButton text={text} onClick={onClick} />
        <CellText isGray>/</CellText>
        <TextButton text={secondText} onClick={onClickSecond} />
      </ButtonsWrapper>
    )}
    {type === "Header" && <>h</>}
    {type === "HeaderSort" && <>hs</>}
  </CommonCellWrapper>
);

export default TableCell;
