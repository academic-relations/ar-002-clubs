import React from "react";

import styled from "styled-components";

import { formatDotDate } from "@sparcs-clubs/web/utils/Date/formateDate";

import FlexWrapper from "../FlexWrapper";
import Icon from "../Icon";
import Typography from "../Typography";

interface DateInputProps {
  date: Date;
  label?: string;
  //   disabled?: boolean;
  //   onChange: (value: Date) => void;
}

const DateInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 4px;
  padding: 8px 12px;
`;

const DateInput: React.FC<DateInputProps> = ({
  date,
  label = "",
  //   disabled = false,
  //   onChange,
}) => (
  <FlexWrapper direction="column" gap={4}>
    {label.length > 0 && (
      <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
        {label}
      </Typography>
    )}
    <DateInputWrapper>
      <Typography
        ff="PRETENDARD"
        fw="REGULAR"
        fs={16}
        lh={20}
        color="BLACK"
        style={{ width: "100%", textAlign: "center" }}
      >
        {formatDotDate(date)}
      </Typography>
      <Icon type="event" size={20} color="BLACK" />
    </DateInputWrapper>
  </FlexWrapper>
);

export default DateInput;
