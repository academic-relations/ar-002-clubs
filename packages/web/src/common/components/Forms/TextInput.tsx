import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import Label from "./_atomic/Label";
import ErrorMessage from "./_atomic/ErrorMessage";

// Define the props interface
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
}

const Input = styled.input`
  display: block;
  width: 300px;
  height: 36px; // hug는 설정 안 하는게 맞나요?
  padding: 8px 12px 8px 12px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 4px;
  gap: 8px;
  &:focus {
    border-color: ${({ theme }) => theme.colors.PRIMARY};
  }
  &:invalid {
    border-color: ${({ theme }) => theme.colors.RED[600]};
  }
`;

// Component
const TextInput: React.FC<TextInputProps> = ({
  label = "",
  placeholder,
  errorMessage = "",
  ...props
}) => (
  <div>
    {label && <Label>{label}</Label>}
    <Input placeholder={placeholder} {...props} />
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </div>
);

export default TextInput;
