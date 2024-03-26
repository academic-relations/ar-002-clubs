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
  padding: 8px 12px 8px 12px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 4px;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  &:focus {
    border-color: ${({ theme }) => theme.colors.PRIMARY};
  }
  &:invalid {
    border-color: ${({ theme }) => theme.colors.RED[600]};
  }
  &:hover {
    border-color: ${({ theme }) => theme.colors.GRAY[300]};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.GRAY[100]};
    border-color: ${({ theme }) => theme.colors.GRAY[200]};
    color: ${({ theme }) => theme.colors.GRAY[300]};
  }
  ::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[200]};
  }
`;

// Component
const TextInput: React.FC<TextInputProps> = ({
  label = "",
  placeholder,
  errorMessage = "",
}) => (
  <div>
    {label && <Label>{label}</Label>}
    <Input placeholder={placeholder} />
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </div>
);

export default TextInput;
