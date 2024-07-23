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
  flex-direction: column;
  width: 100%;
`;

const UnitDiv = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  white-space: nowrap;
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
      <TextInput
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={error}
        {...props}
      >
        <UnitDiv>{unit}</UnitDiv>
      </TextInput>
    </FrameWrapper>
  );
};

export default UnitInput;
