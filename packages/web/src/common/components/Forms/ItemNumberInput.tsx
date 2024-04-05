import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Label from "./_atomic/Label";
import ErrorMessage from "./_atomic/ErrorMessage";

export interface ItemNumberInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasIcon?: boolean;
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
  itemLimit?: number;
  onNumberChange?: (value: string) => void;
}

const LabelWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledInfoIcon = styled(InfoOutlinedIcon)`
  color: ${({ theme }) => theme.colors.GRAY[300]};
  cursor: pointer;
  font-size: 16px;
`;

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

const ItemNumberInput: React.FC<ItemNumberInputProps> = ({
  label = "",
  hasIcon = false,
  placeholder,
  disabled = false,
  itemLimit = 99,
  onNumberChange = () => {},
  ...props
}) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const mainInputRef = useRef<HTMLInputElement>(null);

  const displayValue = value ? `${value}개` : "";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.replace("개", "").search(/[^0-9]/g) >= 0) {
      setError("숫자만 입력 가능합니다");
    } else {
      setError("");
    }

    const inputValue = e.target.value.replace(/[^0-9]/g, "");

    if (inputValue.length <= 2) {
      setValue(inputValue);
      onNumberChange(inputValue);

      // ItemNumberInput을 사용하는 파일에서 위 inputValu을 받기 위해 onChange를 지정하게 되면
      // ItemNumberInput 파일의 Input에서 지정한 onChange가 오버라이딩 되며 ItemNumberInput의 handleChange 자체가 실행되지 않는다
      // 따라서 onNumberChange라는 새로운 function을 넘겨주게 하여 해결했다 (근데 뭔가 더 나은 해결법이 있는 것 같은데...)
      // TODO - onNumberChange 같은 새로운 function을 받지 말고 기존처럼 onChange를 받으면서도 ItemNumberInput이 본 기능을 하게 만들어보자
    }
  };

  const handleCursor = () => {
    mainInputRef.current?.setSelectionRange(
      mainInputRef.current.selectionStart! >= displayValue.length
        ? displayValue.length - 1
        : mainInputRef.current.selectionStart,
      mainInputRef.current.selectionEnd! >= displayValue.length
        ? displayValue.length - 1
        : mainInputRef.current.selectionEnd,
    );
  };

  return (
    <InputWrapper>
      <LabelWithIcon>
        {label && <Label>{label}</Label>}
        {hasIcon ? (
          <StyledInfoIcon
            style={{ fontSize: "16px", width: "16px", height: "16px" }}
          />
        ) : null}
      </LabelWithIcon>
      <InputContainer>
        <Input
          ref={mainInputRef}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          hasError={!!error}
          onSelect={handleCursor}
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
