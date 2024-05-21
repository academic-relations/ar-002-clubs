// ErrorMessage.tsx
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

interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => (
  <StyledErrorMessage>{children}</StyledErrorMessage>
);

export default ErrorMessage;
