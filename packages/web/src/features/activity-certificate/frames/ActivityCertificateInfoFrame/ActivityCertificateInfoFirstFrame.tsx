import React, { useState } from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";

import { ActivityCertificateFrameProps } from "../ActivityCertificateNoticeFrame";

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 40px;
  align-self: stretch;
`;

const LabelWithInputWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: inline-flex;
`;

const ActivityCertificateInfoFirstFrame: React.FC<
  ActivityCertificateFrameProps
> = () => {
  const [itemNumberText, setItemNumberText] = useState("");

  return (
    <StyledCard type="outline">
      <LabelWithInputWrapper>
        <Typography type="p">동아리 이름</Typography>
        <ItemNumberInput
          placeholder=""
          onNumberChange={changedNumber => {
            setItemNumberText(changedNumber);
          }}
          // onChange={e => setIssueCountText(e.target.value)}
        />
      </LabelWithInputWrapper>
      <Typography type="p">{itemNumberText}</Typography>
    </StyledCard>
  );
};

export default ActivityCertificateInfoFirstFrame;
