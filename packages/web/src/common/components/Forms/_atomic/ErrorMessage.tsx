// ErrorMessage.tsx
import React from "react";
import styled from "styled-components";

const StyledErrorMessage = styled.span`
  display: block;
  color: red;
  font-size: 0.8em;
`;

interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => (
  <StyledErrorMessage>{children}</StyledErrorMessage>
);

export default ErrorMessage;
