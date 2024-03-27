import React, { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import Label from "@sparcs-clubs/web/common/components/Forms/_atomic/Label";
import ErrorMessage from "@sparcs-clubs/web/common/components/Forms/_atomic/ErrorMessage";

// Define the props interface
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  area?: boolean; // Add this line
}

const errorBorderStyle = css`
  border-color: ${({ theme }) => theme.colors.RED[600]};
`;

const areaInputStyle = css`
  height: 100px;
  // TODO text 위쪽 정렬
  // TODO 여러 줄 받기
`;

const Input = styled.input<{ hasError?: boolean; area?: boolean }>`
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
  background-color: ${({ theme }) => theme.colors.WHITE};
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
    color: ${({ theme }) => theme.colors.RED[600]};
  }
  ::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[200]};
  }
  ${({ hasError }) => hasError && errorBorderStyle}
  ${({ area }) => area && areaInputStyle} // TextAreaInput
`;

const InputWrapper = styled.div`
  width: 300px;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

// Component
const TextInput: React.FC<TextInputProps> = ({
  label = "",
  placeholder,
  errorMessage = "",
  area = false,
}) => (
  <div>
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <Input
          placeholder={placeholder}
          hasError={!!errorMessage}
          area={area}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    </InputWrapper>
  </div>
);

export default TextInput;
