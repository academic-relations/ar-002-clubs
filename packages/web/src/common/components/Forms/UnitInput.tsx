import React, { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import TextInput, {
  TextInputProps,
} from "@sparcs-clubs/web/common/components/Forms/TextInput";

interface UnitInputProps extends Omit<TextInputProps, "onChange"> {
  unit: string;
  value: string;
  onChange: (value: string) => void;
  setErrorStatus: (hasError: boolean) => void;
}

const FrameWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  flex-grow: 1;
`;

const UnitDiv = styled.div`
  height: 100%;
  display: flex;
  margin-left: auto;
  white-space: nowrap;
  align-items: center;
  padding-left: 10px;
`;

const UnitInput: React.FC<UnitInputProps> = ({
  label,
  placeholder,
  unit,
  value = "",
  onChange = () => {},
  errorMessage = "",
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
    } else if (!isValidFormat) {
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  return (
    <FrameWrapper>
      <BoxWrapper>
        <InputWrapper>
          <TextInput
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={error}
            {...props}
          />
        </InputWrapper>

        <UnitDiv>{unit}</UnitDiv>
      </BoxWrapper>
    </FrameWrapper>
  );
};

export default UnitInput;
