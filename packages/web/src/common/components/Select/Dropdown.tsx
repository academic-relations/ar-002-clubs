import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

const Dropdown = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ marginTop?: number; maxContent?: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: ${({ maxContent }) => (maxContent ? "max-content" : "100%")};
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  gap: 4px;
  z-index: 1000; // Ensure the dropdown appears above other content
`;

export default Dropdown;
