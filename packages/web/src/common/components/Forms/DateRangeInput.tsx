import React, { ChangeEvent, useEffect, useState } from "react";

import styled from "styled-components";

import TextInput, {
  TextInputProps,
} from "@sparcs-clubs/web/common/components/Forms/TextInput";

import FormError from "../FormError";
import Typography from "../Typography";

interface DateRangeInputProps
  extends Omit<TextInputProps, "onChange" | "label"> {
  label?: [start: string, end: string];
  startValue: string;
  endValue: string;
  limitStartValue: string;
  limitEndValue: string;
  onChange: (value: string) => void;
  useDays?: boolean; // New prop to include days
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
  label = ["", ""],
  startValue = "",
  endValue = "",
  limitStartValue = "",
  limitEndValue = "",
  onChange = () => {},
  useDays = false, // Default to false
  ...props
}) => {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [startEndMonth, setStartEndMonth] = useState("|");

  useEffect(() => {
    if (touched) {
      const dateFormat = useDays ? /^(\d{4}-\d{2}-\d{2})$/ : /^(\d{4}-\d{2})$/;
      const isValidFormat =
        (dateFormat.test(startValue) ||
          /^\d*$/.test(startValue.replace(/./g, ""))) &&
        (dateFormat.test(endValue) || /^\d*$/.test(endValue.replace(/./g, "")));

      if (!startValue) {
        setError("시작 기간을 입력하지 않았습니다");
      } else if (!endValue) {
        setError("끝 기간을 입력하지 않았습니다");
      } else if (!isValidFormat) {
        setError("입력 기간이 올바르지 않습니다");
      } else if (
        !(startValue.length === (useDays ? 10 : 7)) ||
        !(endValue.length === (useDays ? 10 : 7))
      ) {
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
  }, [startValue, endValue, touched, useDays]);

  const handleBlur = () => {
    setTouched(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isStartOrEnd: "start" | "end",
  ) => {
    const inputValue = e.target.value;
    const maxLength = useDays ? 10 : 7;
    if (inputValue.length <= maxLength) {
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
    } else if (digits.length <= 6) {
      formattedInput = `${digits.slice(0, 4)}.${digits.slice(4)}`;
    } else if (digits.length <= 8 && useDays) {
      formattedInput = `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
    }

    return formattedInput;
  };

  return (
    <DateRangeInputErrorFrameInner>
      <DateRangeInputFrameInner>
        <TextInput
          label={label[0]}
          value={formatValue(startValue)}
          onChange={e => handleChange(e, "start")}
          errorMessage={error ? " " : ""}
          onBlur={handleBlur}
          {...props}
        />

        <Typography
          style={error ? { marginBottom: "4px" } : {}}
          fs={16}
          lh={20}
          fw="REGULAR"
        >
          ~
        </Typography>

        <TextInput
          label={label[1]}
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
