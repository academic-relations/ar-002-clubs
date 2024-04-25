import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "@sparcs-clubs/web/common/components/Checkbox";
import Button from "@sparcs-clubs/web/common/components/Button";
import {
  ActivityCertificateInterface,
  ActivityCertificateProgress,
} from "../types/activityCertificate";

export interface ActivityCertificateFrameProps {
  activityCertificate: ActivityCertificateInterface;
  setActivityCertificate: React.Dispatch<
    React.SetStateAction<ActivityCertificateInterface>
  >;
  activityCertificateProgress: ActivityCertificateProgress;
  setActivityCertificateProgress: React.Dispatch<
    React.SetStateAction<ActivityCertificateProgress>
  >;
}

const ActivityCertificateNoticeFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 16px;
  align-self: stretch;
`;

const StyledTypography = styled(Typography)`
  line-height: 32px;
`;

const StyledBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const StyledCheckboxOuter = styled.div`
  display: flex;
  padding-left: 4px;
  align-items: center;
  gap: 12px;
`;

const ActivityCertificateNoticeFrame: React.FC<
  ActivityCertificateFrameProps
> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  activityCertificate,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setActivityCertificate,
  activityCertificateProgress,
  setActivityCertificateProgress,
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <ActivityCertificateNoticeFrameInner>
      <StyledCard type="outline">
        <Typography type="h3">안내사항</Typography>
        <StyledTypography type="p">
          대충 활동확인서 발급에 대한 안내사항
          <br />
          기타 등등 안내 내용 -{">"} 이건 동연 측에서 준비해주겠죠?
        </StyledTypography>
      </StyledCard>
      <StyledBottom>
        <StyledCheckboxOuter>
          <Checkbox
            checked={checked}
            onClick={() => setChecked(prev => !prev)}
          />
          <Typography type="p">
            위의 안내사항을 모두 숙지하였으며, 이에 동의합니다
          </Typography>
        </StyledCheckboxOuter>
        <Button
          type={checked ? "default" : "disabled"}
          onClick={
            checked
              ? () =>
                  setActivityCertificateProgress({
                    ...activityCertificateProgress,
                    agreement: true,
                  })
              : undefined
          }
        >
          다음
        </Button>
      </StyledBottom>
    </ActivityCertificateNoticeFrameInner>
  );
};

export default ActivityCertificateNoticeFrame;
