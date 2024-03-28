import React, { ChangeEvent, useEffect, useState } from "react";
import TextInput, {
  TextInputProps,
} from "@sparcs-clubs/web/common/components/Forms/TextInput";

const PhoneInput: React.FC<TextInputProps> = ({ label = "", ...props }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (value && !/^\d*$/.test(value)) {
      setError("숫자만 입력 가능합니다");
    } else {
      setError("");
    }
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <TextInput
      label={label}
      value={value}
      onChange={handleChange}
      errorMessage={error}
      {...props}
    />
  );
};

export default PhoneInput;
