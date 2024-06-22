import React from "react";
import styled from "styled-components";
import Progress from "./_atomic/Progress";
import { Status } from "./_atomic/ProgressDot";
import ProgressLine from "./_atomic/ProgressLine";

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
  height: 76px;
  width: 100%;
  padding: 0 48px;
`;

const ProgressLineWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-top: 12px;
`;

const ProgressCheckSection: React.FC<ProgressCheckSectionProps> = ({
  labels,
  status,
  dates,
}) => (
  <ProgressCheckSectionWrapper>
    {labels.map((label, index) => (
      <React.Fragment key={String(index) + label}>
        <Progress status={status[index]} label={label} date={dates[index]} />
        {index < labels.length - 1 && (
          <ProgressLineWrapper>
            <ProgressLine status={status[index + 1]} />
          </ProgressLineWrapper>
        )}
      </React.Fragment>
    ))}
  </ProgressCheckSectionWrapper>
);
export default ProgressCheckSection;
