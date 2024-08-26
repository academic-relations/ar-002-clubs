import React from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import Typography from "@sparcs-clubs/web/common/components/Typography";

export interface CommonSpaceFrameProps {
  agreement: boolean;
  setAgreement: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommonSpaceNoticeFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const StyledBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const CommonSpaceNoticeFrame: React.FC<CommonSpaceFrameProps> = ({
  agreement,
  setAgreement,
}) => (
  <CommonSpaceNoticeFrameInner>
    <Card outline gap={16}>
      <Typography fs={20} lh={24} fw="MEDIUM">
        안내사항
      </Typography>
      <Typography fs={16} lh={32} fw="REGULAR">
        대충 공용공간 비정기사용에 대한 안내사항
        <br />
        기타 등등 안내 내용 -{">"} 이건 동연 측에서 준비해주겠죠?
      </Typography>
    </Card>
    <StyledBottom>
      <CheckboxOption
        checked={agreement}
        onClick={() => setAgreement(prev => !prev)}
        optionText="위의 안내사항을 모두 숙지하였으며, 이에 동의합니다"
      />
      <Button type={agreement ? "default" : "disabled"}>다음</Button>
    </StyledBottom>
  </CommonSpaceNoticeFrameInner>
);

export default CommonSpaceNoticeFrame;
