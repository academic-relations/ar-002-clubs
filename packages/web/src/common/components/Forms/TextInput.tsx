import React, { ChangeEvent, InputHTMLAttributes, useEffect } from "react";
import styled, { css } from "styled-components";
import Label from "./_atomic/Label";
import ErrorMessage from "./_atomic/ErrorMessage";

// PhoneInput, RentalInput에서 사용하기 위해 export
export interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  area?: boolean;
  disabled?: boolean;
  value?: string;
  handleChange?: (value: string) => void;
  setErrorStatus?: (hasError: boolean) => void;
}

const errorBorderStyle = css`
  border-color: ${({ theme }) => theme.colors.RED[600]};
`;

const disabledStyle = css`
  background-color: ${({ theme }) => theme.colors.GRAY[100]};
  border-color: ${({ theme }) => theme.colors.GRAY[200]};
`;

const areaInputStyle = css`
  height: 100px;
  resize: none;
  overflow: auto;
`;

const Input = styled.input.attrs<TextInputProps>(({ area }) => ({
  as: area ? "textarea" : "input",
}))<TextInputProps & { hasError: boolean }>`
  display: block;
  width: 100%;
  padding: 8px 12px 8px 12px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 4px;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: ${({ theme }) => theme.colors.WHITE};
  &:focus {
    border-color: ${({ theme, hasError, disabled }) =>
      !hasError && !disabled && theme.colors.PRIMARY};
  }
  &:hover:not(:focus) {
    border-color: ${({ theme, hasError, disabled }) =>
      !hasError && !disabled && theme.colors.GRAY[300]};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[200]};
  }
  ${({ disabled }) => disabled && disabledStyle}
  ${({ hasError }) => hasError && errorBorderStyle}
  ${({ area }) => area && areaInputStyle} // TextAreaInput
`;

const InputWrapper = styled.div`
  width: 100%;
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
  disabled = false,
  value = "",
  handleChange = () => {},
  setErrorStatus = () => {},
  ...props
}) => {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    handleChange(inputValue);
  };

  useEffect(() => {
    const hasError = !!errorMessage;
    if (setErrorStatus) {
      setErrorStatus(hasError);
    }
  }, [errorMessage, setErrorStatus]);

  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <Input
          placeholder={placeholder}
          hasError={!!errorMessage}
          area={area}
          disabled={disabled}
          value={value}
          onChange={handleValueChange}
          {...props}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    </InputWrapper>
  );
};

export default TextInput;
