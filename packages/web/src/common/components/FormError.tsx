// FormError.tsx
import React from "react";

import styled from "styled-components";

const StyledErrorMessage = styled.span`
  display: block;
  padding: 0px 0px 0px 2px;
  color: ${({ theme }) => theme.colors.RED[600]};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  font-size: 12px;
  line-height: 16px;
`;

interface FormErrorProps {
  children: React.ReactNode;
}

const FormError: React.FC<FormErrorProps> = ({ children }) => (
  <StyledErrorMessage>{children}</StyledErrorMessage>
);

export default FormError;
