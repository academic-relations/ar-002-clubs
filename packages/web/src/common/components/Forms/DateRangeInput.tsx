import React, { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import TextInput, {
  TextInputProps,
} from "@sparcs-clubs/web/common/components/Forms/TextInput";

import FormError from "../FormError";
import Typography from "../Typography";

interface DateRangeInputProps extends Omit<TextInputProps, "onChange"> {
  startValue: string;
  endValue: string;
  limitStartValue: string;
  limitEndValue: string;
  onChange: (value: string) => void;
}

const DateRangeInputErrorFrameInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateRangeInputFrameInner = styled.div`
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  display: flex;
`;

const availableMonths = [
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

const DateRangeInput: React.FC<DateRangeInputProps> = ({
  label = "",
  startValue = "",
  endValue = "",
  limitStartValue = "",
  limitEndValue = "",
  onChange = () => {},
  ...props
}) => {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [startEndMonth, setStartEndMonth] = useState("|");

  useEffect(() => {
    if (touched) {
      const isValidFormat =
        (/^(\d{4}-\d{2})$/.test(startValue) ||
          /^(\d{4}-\d{1})$/.test(startValue) ||
          /^\d*$/.test(startValue.replace(/./g, ""))) &&
        (/^(\d{4}-\d{2})$/.test(endValue) ||
          /^(\d{4}-\d{1})$/.test(endValue) ||
          /^\d*$/.test(endValue.replace(/./g, "")));

      if (!startValue) {
        setError("시작 기간을 입력하지 않았습니다");
      } else if (!endValue) {
        setError("끝 기간을 입력하지 않았습니다");
      } else if (!isValidFormat) {
        setError("입력 기간이 올바르지 않습니다");
      } else if (!(startValue.length === 7) || !(endValue.length === 7)) {
        setError("입력 기간이 올바르지 않습니다");
      } else if (
        !availableMonths.includes(startValue.split(".")[1]) ||
        !availableMonths.includes(endValue.split(".")[1])
      ) {
        setError("입력 기간이 올바르지 않습니다");
      } else if (
        new Date(startValue).getTime() > new Date(endValue).getTime()
      ) {
        setError("입력 기간이 올바르지 않습니다");
      } else if (
        new Date(startValue).getTime() < new Date(limitStartValue).getTime() ||
        new Date(limitEndValue).getTime() < new Date(startValue).getTime() ||
        new Date(endValue).getTime() < new Date(limitStartValue).getTime() ||
        new Date(limitEndValue).getTime() < new Date(endValue).getTime()
      ) {
        setError("입력 기간이 올바르지 않습니다");
      } else {
        setError("");
      }
    }
  }, [startValue, endValue, touched]);

  const handleBlur = () => {
    setTouched(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isStartOrEnd: "start" | "end",
  ) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 7) {
      if (isStartOrEnd === "start") {
        setStartEndMonth(
          inputValue.concat("|").concat(startEndMonth.split("|")[1]),
        );
        onChange(inputValue.concat("|").concat(startEndMonth.split("|")[1]));
      } else {
        setStartEndMonth(
          startEndMonth.split("|")[0].concat("|").concat(inputValue),
        );
        onChange(startEndMonth.split("|")[0].concat("|").concat(inputValue));
      }
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
    <DateRangeInputErrorFrameInner>
      <DateRangeInputFrameInner>
        <TextInput
          label={label}
          value={formatValue(startValue)}
          onChange={e => handleChange(e, "start")}
          errorMessage={error ? " " : ""}
          onBlur={handleBlur}
          {...props}
        />

        <Typography style={error ? { marginBottom: "4px" } : {}} type="p">
          ~
        </Typography>

        <TextInput
          label={label}
          value={formatValue(endValue)}
          onChange={e => handleChange(e, "end")}
          errorMessage={error ? " " : ""}
          onBlur={handleBlur}
          {...props}
        />
      </DateRangeInputFrameInner>
      {error && <FormError>{error}</FormError>}
    </DateRangeInputErrorFrameInner>
  );
};
// TODO: DB 값 default로 넣어두기

export default DateRangeInput;
