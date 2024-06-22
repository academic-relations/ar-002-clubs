import React, { useState } from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import Checkbox from "@sparcs-clubs/web/common/components/Checkbox";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { CommonSpaceInterface } from "../types/commonSpace";

export interface CommonSpaceFrameProps {
  commonSpace: CommonSpaceInterface;
  setCommonSpace: React.Dispatch<React.SetStateAction<CommonSpaceInterface>>;
}

const CommonSpaceNoticeFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
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

const CommonSpaceNoticeFrame: React.FC<CommonSpaceFrameProps> = ({
  commonSpace,
  setCommonSpace,
}) => {
  const [checked, setChecked] = useState(false);

  const handleNextClick = () => {
    if (checked) {
      setCommonSpace({ ...commonSpace, agreement: true });
    }
  };

  return (
    <CommonSpaceNoticeFrameInner>
      <Card outline gap={16}>
        <Typography type="h3">안내사항</Typography>
        <StyledTypography type="p">
          대충 공용공간 비정기사용에 대한 안내사항
          <br />
          기타 등등 안내 내용 -{">"} 이건 동연 측에서 준비해주겠죠?
        </StyledTypography>
      </Card>
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
          onClick={handleNextClick}
        >
          다음
        </Button>
      </StyledBottom>
    </CommonSpaceNoticeFrameInner>
  );
};

export default CommonSpaceNoticeFrame;
