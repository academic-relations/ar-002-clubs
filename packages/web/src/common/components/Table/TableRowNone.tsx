import React from "react";
import styled from "styled-components";

interface TableRowNoneProp {
  text?: string;
}

const NoneText = styled.div`
  width: 100%;
  padding: 12px 8px;
  text-align: center;

  /* font styles*/
  font-size: 16px;
  line-height: 24px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.GRAY[300]};
`;

const TableRowNone: React.FC<TableRowNoneProp> = ({
  text = "지난 3개월 간 이용 기록이 없습니다.",
}) => <NoneText>{text}</NoneText>;

export default TableRowNone;
