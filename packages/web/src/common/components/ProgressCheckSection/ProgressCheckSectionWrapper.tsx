import styled from "styled-components";

const ProgressCheckSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  align-items: flex-end;
`;

const RowTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ColumnTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export { ProgressCheckSectionWrapper, RowTextWrapper, ColumnTextWrapper };
