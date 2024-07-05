import React from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Info from "@sparcs-clubs/web/common/components/Info";
import ProgressCheckSection, {
  StatusAndDate,
} from "@sparcs-clubs/web/common/components/ProgressCheckSection";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface ProgressStatusProps {
  labels: string[];
  progress: StatusAndDate[];
  infoText: string;
}

const ProgressCheckSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  align-items: flex-end;
`;

const ProgressStatus: React.FC<ProgressStatusProps> = ({
  labels,
  progress,
  infoText,
}) => (
  <ProgressCheckSectionWrapper>
    <Typography
      ff="PRETENDARD"
      fw="MEDIUM"
      fs={16}
      lh={20}
      color="BLACK"
      style={{ width: "100%" }}
    >
      신청 상태
    </Typography>
    <ProgressCheckSection labels={labels} progress={progress} />
    <Info text={infoText} />
    <Button style={{ width: "max-content" }}>신청 취소</Button>
    {/* TODO: onClick 달기 */}
  </ProgressCheckSectionWrapper>
);
export default ProgressStatus;
