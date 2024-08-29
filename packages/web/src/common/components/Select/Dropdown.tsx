import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

const Dropdown = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ marginTop?: number; maxContent?: boolean }>`
  /* TODO: marginTop magic number인데 좀 더 깔끔하게 바꾸는 방법 */
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

  max-height: 200px;
  overflow-y: auto;
`;

export default Dropdown;
