import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  area?: boolean;
  disabled?: boolean;
  onPhoneChange?: (value: string) => void;
}

export const phoneInputEval = (value: string) => {
  const isValidFormat =
    /^(\d{3}-\d{4}-\d{4})$/.test(value) ||
    /^\d*$/.test(value.replace(/-/g, ""));

  if (!value) {
    return "필수로 채워야 하는 항목입니다";
  }
  if (!isValidFormat) {
    return "숫자만 입력 가능합니다";
  }
  if (value.replace(/-/g, "").length !== 11) {
    return "유효하지 않은 전화번호입니다";
  }
  return "";
};

const PhoneInput: React.FC<PhoneInputProps> = ({
  label = "",
  onPhoneChange = () => {},
  ...props
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      setError(phoneInputEval(value));
    }
  }, [value, touched]);

  const handleBlur = () => {
    setTouched(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 13) {
      setValue(inputValue);
      onPhoneChange(inputValue);
    }
  };
  const formatValue = (nums: string) => {
    const digits = nums.replace(/\D/g, "");
    let formattedInput = "";

    if (digits.length <= 3) {
      formattedInput = digits;
    } else if (digits.length <= 7) {
      formattedInput = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else if (digits.length <= 11) {
      formattedInput = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }

    return formattedInput;
  };

  return (
    <TextInput
      label={label}
      value={formatValue(value)}
      onChange={handleChange}
      errorMessage={error}
      onBlur={handleBlur}
      {...props}
    />
  );
};
// TODO: DB 값 default로 넣어두기

export default PhoneInput;
