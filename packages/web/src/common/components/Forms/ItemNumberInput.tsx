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
  rightContent?: React.ReactNode;
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
  padding-right: ${({ rightContent }) => (rightContent ? "48px" : "12px")};

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
  rightContent = "",
  ...props
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      if (!value) {
        setError("필수로 채워야 하는 항목입니다");
      } else {
        setError("");
      }
    }
  }, [value, touched]);

  const handleBlur = () => {
    setTouched(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/개$/, ""); // '개' 제거 후 상태 업데이트
    setValue(inputValue);
  };

  const formatValue = (nums: string) => {
    const digits = nums.replace(/\D/g, "");
    return digits.length > 0 ? `${digits}개` : "";
  };

  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <InputContainer>
        <Input
          value={formatValue(value)}
          onChange={handleChange}
          errorMessage={error}
          onBlur={handleBlur}
          placeholder={placeholder}
          hasError={!!error}
          disabled={disabled}
          rightContent={!!rightContent}
          {...props}
        />
        {rightContent && (
          <RightContentWrapper hasError={!!error}>
            {rightContent}
          </RightContentWrapper>
        )}
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default ItemNumberInput;
