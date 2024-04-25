import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";

interface StartEndMonthInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  startEndType: "startMonth" | "endMonth";
  placeholder: string;
  errorMessage?: string;
  area?: boolean;
  disabled?: boolean;
  onMonthChange?: (value: string) => void;
}

const availableMonths1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const availableMonths2 = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export const monthInputEval = (
  value: string,
  startEndType: "startMonth" | "endMonth",
) => {
  const isValidFormat =
    /^(\d{4}.\d{2})$/.test(value) ||
    /^(\d{4}.\d{1})$/.test(value) ||
    /^\d*$/.test(value.replace(/./g, ""));

  if (!value) {
    if (startEndType === "startMonth") {
      return "시작 기간을 입력하지 않았습니다";
    }
    return "끝 기간을 입력하지 않았습니다";
  }
  if (!isValidFormat) {
    return "숫자만 입력 가능합니다";
  }
  if (value.replace(".", "").length <= 4) {
    return "입력 기간이 올바르지 않습니다";
  }
  if (
    (value.replace(".", "").length === 5 &&
      !availableMonths1.includes(value.replace(".", "").slice(4))) ||
    (value.replace(".", "").length === 6 &&
      !availableMonths2.includes(value.replace(".", "").slice(4)))
  ) {
    return "입력 기간이 올바르지 않습니다"; // TODO - 입력 월이 잘못된 케이스이기 때문에 다른 에러 메세지가 필요함
  }
  return "";
};

const MonthInput: React.FC<StartEndMonthInputProps> = ({
  label = "",
  startEndType = "startMonth",
  onMonthChange = () => {},
  ...props
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      setError(monthInputEval(value, startEndType));
    }
  }, [value, touched]);

  const handleBlur = () => {
    setTouched(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 7) {
      setValue(inputValue);
      onMonthChange(inputValue);
    }
  };
  const formatValue = (nums: string) => {
    const digits = nums.replace(/\D/g, "");
    let formattedInput = "";

    if (digits.length <= 4) {
      formattedInput = digits;
    } else if (digits.length <= 7) {
      formattedInput = `${digits.slice(0, 4)}.${digits.slice(4)}`;
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

export default MonthInput;
