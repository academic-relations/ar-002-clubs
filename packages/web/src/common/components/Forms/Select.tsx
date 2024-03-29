import React from "react";
import styled from "styled-components";
import SelectBox, { SelectProps } from "./SelectBox";
import Label from "./_atomic/Label";
import ErrorMessage from "./_atomic/ErrorMessage";

const InputWrapper = styled.div`
  width: 300px;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

const Select: React.FC<SelectProps> = ({
  label = "",
  errorMessage = "",
  ...props
}) => (
  <InputWrapper>
    {label && <Label>{label}</Label>}
    <InputWrapper>
      <SelectBox {...props} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputWrapper>
  </InputWrapper>
);

export default Select;
