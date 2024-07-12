import React from "react";

import styled from "styled-components";

interface FormCheckProps {
  label?: string;
  formContents: Array<[string, string]>;
}

const FormCheckInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const StyledLabel = styled.label`
  display: block;
  margin: 0px 2px 0px 2px;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
  line-height: 20px;
  text-align: left;
`;

const FormCheck: React.FC<FormCheckProps> = ({ label = "", formContents }) => (
  <FormCheckInner>
    {label && <StyledLabel>{label}</StyledLabel>}
    {formContents.map(content => (
      <li key={content[0]}>{content[1]}</li>
    ))}
  </FormCheckInner>
);

export default FormCheck;
