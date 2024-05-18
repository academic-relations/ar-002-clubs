import styled from "styled-components";

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px;
`;
