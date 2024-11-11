/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import StyledBottom from "@sparcs-clubs/web/common/components/StyledBottom";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import {
  ActivityCertificateInterface,
  ActivityCertificateProgress,
  FirstErrorStatus,
  SecondErrorStatus,
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
  firstErrorStatus: FirstErrorStatus;
  setFirstErrorStatus: React.Dispatch<React.SetStateAction<FirstErrorStatus>>;
  secondErrorStatus: Array<SecondErrorStatus>;
  setSecondErrorStatus: React.Dispatch<
    React.SetStateAction<Array<SecondErrorStatus>>
  >;
}

const ActivityCertificateNoticeFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const ActivityCertificateNoticeFrame: React.FC<
  ActivityCertificateFrameProps
> = ({
  activityCertificate,
  setActivityCertificate,
  activityCertificateProgress,
  setActivityCertificateProgress,
  firstErrorStatus,
  setFirstErrorStatus,
  secondErrorStatus,
  setSecondErrorStatus,
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <ActivityCertificateNoticeFrameInner>
      <Card outline gap={16}>
        <Typography fs={20} lh={24} fw="MEDIUM">
          안내사항
        </Typography>
        <Typography fs={16} lh={32} fw="REGULAR">
          대충 활동확인서 발급에 대한 안내사항
          <br />
          기타 등등 안내 내용 -{">"} 이건 동연 측에서 준비해주겠죠?
        </Typography>
      </Card>
      <StyledBottom>
        <CheckboxOption
          checked={checked}
          onClick={() => setChecked(prev => !prev)}
          optionText="위의 안내사항을 모두 숙지하였으며, 이에 동의합니다"
        />
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
