import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

export const TableWrapper = styled.table`
  display: flex;
  flex-direction: column;
  gap: 0px;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
`;

export const TableRow = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isBorder?: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 0px;
  border: ${({ isBorder = false, theme }) =>
    isBorder ? `1px solid ${theme.colors.GRAY[200]}` : "none"};
`;
