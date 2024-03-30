import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import styled, { css } from "styled-components";
import Label from "./_atomic/Label";
import ErrorMessage from "./_atomic/ErrorMessage";

export interface ItemNumberInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
  itemLimit?: number;
}

const errorBorderStyle = css`
  border-color: ${({ theme }) => theme.colors.RED[600]};
`;

const disabledStyle = css`
  background-color: ${({ theme }) => theme.colors.GRAY[100]};
  border-color: ${({ theme }) => theme.colors.GRAY[200]};
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const RightContentWrapper = styled.div<{ hasError: boolean }>`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  pointer-events: none;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme, hasError }) =>
    hasError ? theme.colors.RED[600] : theme.colors.GRAY[300]};
`;

const Input = styled.input<ItemNumberInputProps & { hasError: boolean }>`
  display: block;
  width: 100%;
  padding: 8px 12px;
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
  padding-right: ${({ itemLimit }) => (itemLimit ? "48px" : "12px")};

  &:focus {
    border-color: ${({ theme, hasError, disabled }) =>
      !hasError && !disabled ? theme.colors.PRIMARY : undefined};
  }

  &:hover:not(:focus) {
    border-color: ${({ theme, hasError, disabled }) =>
      !hasError && !disabled ? theme.colors.GRAY[300] : undefined};
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[200]};
  }

  ${({ disabled }) => disabled && disabledStyle}
  ${({ hasError }) => hasError && errorBorderStyle}
`;

const InputWrapper = styled.div`
  width: 300px;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

const ItemNumberInput: React.FC<ItemNumberInputProps> = ({
  label = "",
  placeholder,
  disabled = false,
  itemLimit = 99,
  ...props
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isValidFormat = /^\d+$/g.test(value);
    const numericValue = parseInt(value);
    if (!isValidFormat) {
      setError("숫자만 입력 가능합니다");
    } else if (numericValue > itemLimit) {
      setError("신청 가능 개수를 초과했습니다");
    } else {
      setError("");
    }
  }, [value, itemLimit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 2) {
      setValue(inputValue);
    }
  };

  // TODO: '개' 앞으로 커서 위치 조절
  // TODO: '개' 붙이기 & 숫자만 입력 동시 적용
  // TODO: 선택 가능 개수 초과 판단

  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <InputContainer>
        <Input
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          hasError={!!error}
          {...props}
        />
        {itemLimit && (
          <RightContentWrapper hasError={!!error}>
            / {itemLimit}개
          </RightContentWrapper>
        )}
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default ItemNumberInput;
