import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";

import FormError from "../FormError";
import Label from "../FormLabel";

interface UnitInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  unit?: string;
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

const Input = styled.input
  .withConfig({
    shouldForwardProp: prop => isPropValid(prop) && prop !== "hasError",
  })
  .attrs<UnitInputProps>({})<UnitInputProps & { hasError: boolean }>`
  display: block;
  width: 100%;
  padding: 8px 12px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
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
`;

const InputWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

const UnitWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UnitLabel = styled.span`
  position: absolute;
  right: 12px;
  color: ${({ theme }) => theme.colors.BLACK};
  font-size: 16px;
  line-height: 20px;
`;

const UnitInput: React.FC<UnitInputProps> = ({
  label = "",
  placeholder,
  errorMessage = "",
  disabled = false,
  unit = "",
  value = "",
  handleChange = () => {},
  setErrorStatus = () => {},
  ...props
}) => {
  const [error, setError] = useState(errorMessage);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const isValidFormat = /^\d+$/g.test(value);

    if (touched && !value) {
      setError("필수로 채워야 하는 항목입니다");
      setErrorStatus(true);
    } else if (touched && !isValidFormat) {
      setError("숫자만 입력 가능합니다.");
      setErrorStatus(true);
    } else {
      setError("");
      setErrorStatus(false);
    }
  }, [value, touched]);

  const handleBlur = () => {
    setTouched(true);
  };

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
      <UnitWrapper>
        <Input
          placeholder={placeholder}
          hasError={!!errorMessage}
          disabled={disabled}
          value={value}
          onBlur={handleBlur}
          onChange={handleValueChange}
          {...props}
        />
        {unit && <UnitLabel>{unit}</UnitLabel>}
      </UnitWrapper>
      {error && <FormError>{error}</FormError>}
    </InputWrapper>
  );
};

export default UnitInput;
