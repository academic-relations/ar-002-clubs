import React from "react";
import styled from "styled-components";
import { Status } from "./_atomic/ProgressDot";
import ProgressLine from "./_atomic/ProgressLine";
import Progress from "./_atomic/Progress";

interface ProgressCheckSectionProps {
  labels: string[];
  status: Status[];
  dates: (Date | undefined)[];
}

const ProgressCheckSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: flex-start;
  justify-content: center;
  height: 76px;
  width: 100%;
`;
const ProgressCheckSection: React.FC<ProgressCheckSectionProps> = ({
  labels,
  status,
  dates,
}) => (
  <ProgressCheckSectionWrapper>
    {labels.map((label, index) => (
      <React.Fragment key={index}>
        <Progress status={status[index]} label={label} date={dates[index]} />
        {index < labels.length - 1 && <ProgressLine status={status[index]} />}
      </React.Fragment>
    ))}
  </ProgressCheckSectionWrapper>
);
export default ProgressCheckSection;
