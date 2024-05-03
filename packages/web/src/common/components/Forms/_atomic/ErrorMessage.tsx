// ErrorMessage.tsx
import React from "react";
import styled from "styled-components";

const StyledErrorMessage = styled.span`
  display: block;
  /* width: 300px; */
  // Width가 300px로 고정값일 시 error message 자체의 길이가 TextInput의 기존 길이보다 길어져서 원래 스타일을 부수는 현상이 발생. 삭제 요청.

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
