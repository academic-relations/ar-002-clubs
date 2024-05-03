import React from "react";
import styled from "styled-components";
import TextButton from "../TextButton";

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

const TableCell: React.FC<TableCellProps> = ({
  type,
  text,
  secondText = "",
  onClick = () => {},
  onClickSecond = () => {},
}) => (
  <CommonCellWrapper>
    {type === "Default" && <CellText isGray={false}>default</CellText>}
    {type === "None" && <CellText isGray>None</CellText>}
    {type === "Tag" && <>tag</>}
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
