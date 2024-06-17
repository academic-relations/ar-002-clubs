import styled from "styled-components";

const Dropdown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 4px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  gap: 4px;
  z-index: 1000; // Ensure the dropdown appears above other content
`;

export default Dropdown;
