import React from "react";

import styled from "styled-components";

import Typography, {
  ThemeColors,
} from "@sparcs-clubs/web/common/components/Typography";
import { formatSlashDateTime } from "@sparcs-clubs/web/utils/Date/formateDate";

import ProgressDot, { Status } from "./ProgressDot";

interface ProgressProps {
  status?: Status;
  label: string;
  date: Date | undefined;
}

const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 24px;
  position: relative;
`;

const TextWrapper = styled.div`
  display: flex;
  margin-top: 32px;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  position: absolute;
  width: max-content;
`;

const Progress = ({ status = Status.Pending, label, date }: ProgressProps) => {
  let labelColor: ThemeColors;
  switch (status) {
    case Status.Approved:
      labelColor = "PRIMARY";
      break;
    case Status.Canceled:
      labelColor = "RED.600";
      break;
    default:
      labelColor = "GRAY.300";
      break;
  }
  return (
    <ProgressWrapper>
      <ProgressDot status={status} />
      <TextWrapper>
        <Typography
          ff="PRETENDARD"
          fw="MEDIUM"
          fs={16}
          lh={20}
          color={labelColor}
        >
          {label}
        </Typography>
        {date !== undefined && (
          <Typography
            ff="PRETENDARD"
            fw="REGULAR"
            fs={14}
            lh={16}
            color={labelColor}
          >
            {formatSlashDateTime(date)}
          </Typography>
        )}
      </TextWrapper>
    </ProgressWrapper>
  );
};

export default Progress;
