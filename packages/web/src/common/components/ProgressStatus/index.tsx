import React from "react";
import styled from "styled-components";

import Info from "@sparcs-clubs/web/common/components/Info";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import ProgressCheckSection, {
  StatusAndDate,
} from "./_atomic/ProgressCheckSection";

interface ProgressStatusProps {
  title?: string;
  labels: string[];
  progress: StatusAndDate[];
  infoText?: string;
  optional?: React.ReactNode;
}

const ProgressCheckSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  align-items: flex-end;
`;

const ProgressStatus: React.FC<ProgressStatusProps> = ({
  title,
  labels,
  progress,
  infoText = "",
  optional = undefined,
}) => (
  <ProgressCheckSectionWrapper>
    <Typography fw="MEDIUM" fs={16} lh={20} style={{ width: "100%" }}>
      {title || "신청 상태"}
    </Typography>
    <ProgressCheckSection labels={labels} progress={progress} />
    {infoText && <Info text={infoText} />}
    {optional}
    {/* TODO: onClick 달기 */}
  </ProgressCheckSectionWrapper>
);
export default ProgressStatus;
